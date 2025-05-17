import { useQuery } from "@tanstack/react-query"
import {
  Card,
  CardBody,
  HStack,
  Input,
  List,
  ListItem,
  Option,
  Select,
  Separator,
  Text,
  useNotice,
} from "@yamada-ui/react"
import { useState } from "react"

// サポートされている通貨リスト
const CURRENCIES = [
  { code: "USD", name: "USドル" },
  { code: "JPY", name: "日本円" },
  { code: "EUR", name: "ユーロ" },
  { code: "GBP", name: "英ポンド" },
  { code: "AUD", name: "豪ドル" },
  { code: "CAD", name: "カナダドル" },
  { code: "CHF", name: "スイスフラン" },
  { code: "CNY", name: "中国元" },
]

// 固定の為替レート（初期値として使用）
const DEFAULT_RATE = 150.45

// Frankfurter APIからのレスポンス型定義
interface ExchangeRateResponse {
  rates: Record<string, number>
}

// 為替レート取得関数の戻り値型
interface ExchangeRateResult {
  rate: number
}

export const ExchangeRateConverter = () => {
  const [amount1, setAmount1] = useState("1")
  const [currency1, setCurrency1] = useState("USD")
  const [currency2, setCurrency2] = useState("JPY")
  const notice = useNotice({ limit: 1 })

  // APIから為替レートを取得する関数
  const fetchExchangeRate = async (): Promise<ExchangeRateResult> => {
    if (currency1 === currency2) {
      return { rate: 1 }
    }
    try {
      const response = await fetch(
        `https://api.frankfurter.app/latest?from=${currency1}&to=${currency2}`,
      )
      const data: ExchangeRateResponse = await response.json()
      if (data && data.rates && data.rates[currency2]) {
        return { rate: data.rates[currency2] }
      }
      return { rate: DEFAULT_RATE }
    } catch {
      return { rate: DEFAULT_RATE }
    }
  }

  const query = useQuery<ExchangeRateResult, Error>({
    queryFn: fetchExchangeRate,
    queryKey: ["exchangeRate", currency1, currency2],
    staleTime: 1000 * 60 * 5,
  })

  // エラー時の通知
  if (query.isError) {
    notice({
      description: "為替レートの取得に失敗しました",
      duration: 3000,
      status: "error",
      title: "エラー",
    })
  }

  const currentRate = query.data?.rate ?? DEFAULT_RATE
  const amount2 = ((parseFloat(amount1) || 0) * currentRate).toFixed(2)

  // 通貨選択が変更された時のハンドラー
  const handleCurrency1Change = (value: string) => {
    setCurrency1(value)
  }
  const handleCurrency2Change = (value: string) => {
    setCurrency2(value)
  }
  // Input1入力時の処理
  const handleAmount1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount1(value)
    }
  }
  // Input2入力時の処理
  const handleAmount2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      // amount2からamount1を逆算
      const numValue = parseFloat(value) || 0
      const converted = (numValue / currentRate).toFixed(2)
      setAmount1(converted)
    }
  }

  if (query.isError) {
    return <Text color="red.500">Error: {query.error?.message}</Text>
  }

  return (
    <Card colorScheme="teal" variant="subtle">
      <CardBody>
        <List>
          <ListItem>
            <HStack
              border="1px solid"
              borderColor="black"
              borderRadius="md"
              h="6xs"
              separator={<Separator h="7xs" />}
            >
              <Input
                _active={{ borderColor: "none" }}
                _focusVisible={{ borderColor: "none" }}
                _hover={{ borderColor: "none" }}
                borderColor="transparent"
                onChange={handleAmount1Change}
                value={amount1}
              />{" "}
              <Select
                _active={{ borderColor: "none" }}
                _focusVisible={{ borderColor: "none" }}
                _hover={{ borderColor: "none" }}
                aria-label="通貨1の選択"
                borderColor="transparent"
                onChange={handleCurrency1Change}
                title="通貨1"
                value={currency1}
                width="120px"
              >
                {CURRENCIES.map((c) => (
                  <Option key={c.code} value={c.code}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </HStack>
          </ListItem>
          <ListItem>
            <HStack
              border="1px solid"
              borderColor="black"
              borderRadius="md"
              h="6xs"
              separator={<Separator h="7xs" />}
            >
              <Input
                _active={{ borderColor: "none" }}
                _focusVisible={{ borderColor: "none" }}
                _hover={{ borderColor: "none" }}
                borderColor="transparent"
                onChange={handleAmount2Change}
                value={amount2}
              />{" "}
              <Select
                _active={{ borderColor: "none" }}
                _focusVisible={{ borderColor: "none" }}
                _hover={{ borderColor: "none" }}
                aria-label="通貨2の選択"
                borderColor="transparent"
                onChange={handleCurrency2Change}
                title="通貨2"
                value={currency2}
                width="120px"
              >
                {CURRENCIES.map((c) => (
                  <Option key={c.code} value={c.code}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </HStack>
          </ListItem>{" "}
          <ListItem mt={2}>
            <Text fontSize="sm">
              {query.isLoading
                ? "為替レートを取得中..."
                : `現在のレート: 1 ${currency1} = ${currentRate.toFixed(2)} ${currency2}`}
            </Text>
          </ListItem>
        </List>
      </CardBody>
    </Card>
  )
}
