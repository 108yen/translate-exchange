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
import { useEffect, useState } from "react"

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

export const ExchangeRateConverter = () => {
  // 金額と通貨の状態管理
  const [amount1, setAmount1] = useState("1")
  const [amount2, setAmount2] = useState(DEFAULT_RATE.toString())
  const [currency1, setCurrency1] = useState("USD")
  const [currency2, setCurrency2] = useState("JPY")
  const [currentRate, setCurrentRate] = useState<number>(DEFAULT_RATE)
  const notice = useNotice({ limit: 1 })

  // APIから為替レートを取得する関数
  const fetchExchangeRate = async () => {
    if (currency1 === currency2) {
      setCurrentRate(1)
      const value = parseFloat(amount1) || 0
      setAmount2(value.toString())
      return
    }
    try {
      // Frankfurter APIを使用 (無料、登録不要)
      const response = await fetch(
        `https://api.frankfurter.app/latest?from=${currency1}&to=${currency2}`,
      )
      const data = await response.json()

      if (data && data.rates && data.rates[currency2]) {
        // 新しいレートを設定
        const newRate = data.rates[currency2]
        setCurrentRate(newRate)

        // 現在の金額で再計算
        const numValue = parseFloat(amount1) || 0
        const converted = (numValue * newRate).toFixed(2)
        setAmount2(converted)

        // 成功メッセージ
        notice({
          description: `最新レート: 1${currency1} = ${newRate.toFixed(2)}${currency2}`,
          duration: 3000,
          status: "success",
          title: "為替レート更新",
        })
      }
    } catch (error) {
      console.error("為替レートの取得に失敗しました", error)
      notice({
        description: "為替レートの取得に失敗しました",
        duration: 3000,
        status: "error",
        title: "エラー",
      })
    }
  }

  // 通貨選択が変更された時のハンドラー
  const handleCurrency1Change = (value: string) => {
    setCurrency1(value)
    // 通貨変更は自動的に useEffect を通じてレート更新をトリガーする
  }

  const handleCurrency2Change = (value: string) => {
    setCurrency2(value)
    // 通貨変更は自動的に useEffect を通じてレート更新をトリガーする
  }

  // 初回ロード時に一度だけレートを取得
  useEffect(() => {
    fetchExchangeRate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // 依存配列を空にして初回ロード時のみ実行

  // 通貨が変更されたときにレートを取得
  useEffect(() => {
    // 初回レンダリング時はスキップ (初期レンダリングフラグを使用)
    if (currency1 && currency2) {
      fetchExchangeRate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency1, currency2])

  // Input1入力時の処理
  const handleAmount1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // 数値のみ許可
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount1(value)

      // 通貨2への変換
      const numValue = parseFloat(value) || 0
      const converted = (numValue * currentRate).toFixed(2)
      setAmount2(converted)
    }
  }

  // Input2入力時の処理
  const handleAmount2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // 数値のみ許可
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount2(value)

      // 通貨1への変換
      const numValue = parseFloat(value) || 0
      const converted = (numValue / currentRate).toFixed(2)
      setAmount1(converted)
    }
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
              現在のレート: 1 {currency1} = {currentRate.toFixed(2)} {currency2}
            </Text>
          </ListItem>
        </List>
      </CardBody>
    </Card>
  )
}
