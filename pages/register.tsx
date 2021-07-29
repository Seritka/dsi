import React, { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { Button, Flex, Heading, Text } from "@chakra-ui/react"
import dynamic from "next/dynamic"
import { secureStorage } from '@utils/secureStorage'
import styles from '@styles/Home.module.css'

const FooterComponent = dynamic(() => import('@components/Footer'))
const BarcodeScannerComponent = dynamic(() => import('react-qr-barcode-scanner'), { ssr: false })

export default function Register() {
    const [isPrivacy, setPrivacy] = useState<Boolean>(false)
    const [code, setCode] = useState<string>()
    const [_, setLoading] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        secureStorage.getItem('code').then((value: string) => setCode(value))

        if (code !== '' && code !== undefined && code !== null) {
            router.push('/')
            secureStorage.setItem('code', code)
        }

        secureStorage.getItem('privacy').then((value: string) => setPrivacy(Boolean(value) ? true : false))
        return () => setLoading(false)
    }, [isPrivacy, code, router])

    if (isPrivacy) {
        //SCAN bar CODE 87vh
        return (
            <>
            <Flex height="100vh" direction="column" alignItems="center" justifyContent="center" className={styles.background}>
                <Heading size="h1" color="white">학생증 바코드 등록하기</Heading>
                    <BarcodeScannerComponent
                        width={320}
                        height={240}
                        delay={100}
                        onUpdate={(error: unknown, result?: any) => {
                            // 유효성 검사
                            if (result)  {
                                if (result.text.length !== 6) {
                                    alert("잘못된 데이터입니다.")
                                    router.push('/')
                                } else if (!result.text.startsWith('S')) {
                                    alert('학생이 아니라는 것을 증명하지 마세요.')
                                    router.push('/')
                                } else if (!(
                                    Number((new Date().getFullYear()-2).toString().slice(2)) <= Number(result.text.slice(1, 3)) &&
                                    Number(result.text.slice(1, 3)) <= Number((new Date().getFullYear()).toString().slice(2))
                                    ))
                                {
                                    alert(new Date().getFullYear().toString() + '~' + (new Date().getFullYear()+3).toString() + '년도의 학생이 아니라는 것에 증명하지 마세요.')
                                    router.push('/')
                                } else {
                                    setCode(result.text)
                                }
                            }
                            else console.log('not found')
                            if (error === "NotAllowedError") alert("Not Allowed Camera Permissions")
                        }}
                    />
                    <Text textAlign="center">
                        <strong>
                            바코드를 인식하면 자동적으로
                            <br/>
                            바코드 페이지로 이동됩니다.
                        </strong>
                    </Text>
          </Flex>
           <FooterComponent isCode={false}/>
          </>
        )
    } else {
        // 동의하면 true 넣고 리닥
        return (
            <>
            <Flex p={8} height={999} color="white" direction="column" className={styles.background}>
                <Heading as="h3" size="lg">개인정보 수집 이용 동의</Heading>
                <br/><br/>
                <Heading as="h4" size="md">수집 항목</Heading>
                <Text>- 학생증 바코드 고유 번호</Text>
                <Text fontSize="xs">
                    CodIT(이하 &quot;<Text as="i">코딧</Text>&quot;)은 디지털 학생증(일명 &apos;<Text as="i">모바일 학생증</Text>&apos;) 제공을 위하여 아래와 같이 개인정보를 수집·이용 및 제공하고자 합니다.
                    <br/>
                    내용을 자세히 읽으신 후 동의 여부를 결정하여 주십시오.
                    <br/><br/>
                    개인정보 수집 · 이용 내역 · 항목 수집 목적 보유 기간
                    <br/><br/>
                    <Text as="u">학생의 고유 바코드 · 디지털 학생증 운영 · 3년</Text>
                    <br/><br/>
                    위의 개인정보 수집·이용에 대한 동의를 거부할 권리가 있습니다.
                    <br/>
                    그러나 동의를 거부할 경우 원활한 서비스 제공에 일부 제한을 받을 수 있습니다.
                    <br/><br/>
                    <strong>위와 같이 개인정보를 수집·이용하는데 동의하십니까?</strong>
                </Text>
                <br/>
                <Button
                    border="solid 1px white"
                    borderRadius="18px"
                    textAlign="center"
                    color="#5991CC"
                    bg="#FFFFFF"
                    onClick={() => {
                        secureStorage.setItem('privacy', 'true')
                        location.reload()
                    }}>
                    동의
                </Button>
            </Flex>
            <FooterComponent isCode={false}/>
            </>
        )
    }
}