import styles from '@styles/Home.module.css'
import { Flex, Heading, Text } from "@chakra-ui/react"
import dynamic from "next/dynamic"
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { secureStorage } from '@utils/secureStorage'
const BarcodeScannerComponent = dynamic(() => import('react-qr-barcode-scanner'), { ssr: false })
const FooterComponent = dynamic(() => import('@components/Footer'))


export default function Barcode() {
    const router = useRouter()
    const [code, setCode] = useState<string>()
    const [name, setName] = useState<string>()
    const [id, setID] = useState<string>()

    useEffect(() => {
        secureStorage.getItem('code').then((value: string) => value === undefined ? undefined : setCode(value))
        secureStorage.getItem('id').then((value: string) => value === undefined ?  undefined : setID(value))
        secureStorage.getItem('name').then((value: string) => value === undefined ? undefined : setName(value))


        if (code !== '' && code !== undefined && code !== null &&
            name !== '' && name !== undefined && name !== null &&
            id !== '' && id !== undefined && id !== null) {

            router.push('/')
        }
    }, [code, id, name, router])


    return (
        <>
    <Flex height="100vh" direction="column" alignItems="center" justifyContent="center" className={styles.background}>
    <Heading size="h1" color="white">학생증 바코드 등록하기</Heading>
        <BarcodeScannerComponent
            width={260}
            height={240}
            delay={1}
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
                        secureStorage.setItem('code', result.text)
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
}