import { useQuery } from "@tanstack/react-query"
import { Card, CardBody, CardHeader, Heading, Textarea } from "@yamada-ui/react"
import { useEffect, useState } from "react"

export function Translator() {
  const [input, setInput] = useState("")
  const [accessToken, setAccessToken] = useState<null | string>(null)
  const [tokenError, setTokenError] = useState<null | string>(null)

  // 初回のみトークン取得
  useEffect(function () {
    async function fetchToken() {
      // .envからclient_id, client_secret, tokenUrlを取得
      const client_id = import.meta.env.VITE_TRANSLATE_CLIENT_ID
      const client_secret = import.meta.env.VITE_TRANSLATE_CLIENT_SECRET
      const tokenUrl = import.meta.env.VITE_TRANSLATE_TOKEN_REQUEST_URL
      try {
        const tokenRes = await fetch(tokenUrl, {
          body: new URLSearchParams({
            client_id,
            client_secret,
            grant_type: "client_credentials",
          }),
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "POST",
        })
        const tokenData = await tokenRes.json()
        if (tokenData.access_token) {
          setAccessToken(tokenData.access_token)
        } else {
          setTokenError("トークン取得に失敗したのだ")
        }
      } catch {
        setTokenError("トークン取得でエラーが発生したのだ")
      }
    }
    fetchToken()
  }, [])

  /**
   * みんなの自動翻訳（NICT）APIで翻訳を実行します。
   * @returns 翻訳結果の文字列、またはnull/空文字
   */
  async function fetchTranslation(): Promise<null | string> {
    if (!input.trim() || !accessToken) return ""
    const res = await fetch(
      "https://mt-auto-minhon-mlt.ucri.jgn-x.jp/api/mt/generalNT_en_ja/",
      {
        body: new URLSearchParams({
          access_token: accessToken,
          key: "",
          text: input,
          type: "json",
        }),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "POST",
      },
    )
    const data = await res.json()
    if (data.resultset && data.resultset.result && data.resultset.result.text) {
      return data.resultset.result.text
    }
    return null
  }

  const {
    data: translated,
    error,
    isLoading,
  } = useQuery({
    enabled: !!input.trim(),
    queryFn: fetchTranslation,
    queryKey: ["translation", input],
    staleTime: 1000 * 60 * 5,
  })

  return (
    <Card variant="subtle">
      <CardHeader>
        <Heading size="md">英語 → 日本語</Heading>
      </CardHeader>
      <CardBody>
        {tokenError && <div style={{ color: "red" }}>{tokenError}</div>}
        <Textarea
          _active={{ borderColor: "none" }}
          _focusVisible={{ borderColor: "none" }}
          _hover={{ borderColor: "none" }}
          borderColor="transparent"
          onChange={function (e) {
            setInput(e.target.value)
          }}
          p={0}
          placeholder="Hello world!"
          value={input}
        />
        <div className="mt-4">
          <Heading mb={1} size="sm">
            翻訳結果
          </Heading>
          <Textarea
            minH="80px"
            placeholder="ここに日本語訳が表示されます"
            readOnly
            value={
              !accessToken
                ? "(トークン取得中なのだ…)"
                : input.trim()
                  ? isLoading
                    ? "翻訳中なのだ…"
                    : error || translated === null
                      ? "(翻訳できなかったのだ)"
                      : translated
                  : "ここに日本語訳が表示されます"
            }
          />
        </div>
      </CardBody>
    </Card>
  )
}
