import styles from '@styles/Home.module.css'
import { Flex, Heading, Text } from "@chakra-ui/react"
import dynamic from "next/dynamic"
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { secureStorage } from '@utils/secureStorage'
import Quagga from '@ericblade/quagga2'
const FooterComponent = dynamic(() => import('@components/Footer'))


export default function Barcode() {
    const router = useRouter()
    const [code, setCode] = useState<string>()
    const [name, setName] = useState<string>()
    const [id, setID] = useState<string>()
    const [barcodeImgUrl, setBarcodeImgUrl] = useState<string>("")

    useEffect(() => {

        if (barcodeImgUrl != "") {
            Quagga.decodeSingle({
                decoder: {
                    readers: ["code_128_reader"]
                },
                locate: true,
                src: barcodeImgUrl,
            }, function(result){
                if (result.codeResult) {
                    if (!result.codeResult.code) return
                    console.log("result", result.codeResult.code);
                    const code: string = result.codeResult.code

                    if (code.length !== 6) {
                        alert("잘못된 데이터입니다.")
                        router.push('/')
                    } else if (!code.startsWith('S')) {
                        alert('학생이 아니라는 것을 증명하지 마세요.')
                        router.push('/')
                    } else if (!(
                        Number((new Date().getFullYear()-2).toString().slice(2)) <= Number(code.slice(1, 3)) &&
                        Number(code.slice(1, 3)) <= Number((new Date().getFullYear()).toString().slice(2))
                        ))
                    {
                        alert(new Date().getFullYear().toString() + '~' + (new Date().getFullYear()+3).toString() + '년도의 학생이 아니라는 것에 증명하지 마세요.')
                        router.push('/')
                    } else {
                        secureStorage.setItem('code', code)
                        setCode(code)
                    }

                } else {
                    alert('바코드 인식이 안됩니다. 다시 제대로 된 사진을 올리세요.')
                    router.push('/')
                }
            });
        }

        secureStorage.getItem('code').then((value: string) => value === undefined ? undefined : setCode(value))
        secureStorage.getItem('id').then((value: string) => value === undefined ?  undefined : setID(value))
        secureStorage.getItem('name').then((value: string) => value === undefined ? undefined : setName(value))


        if (code !== '' && code !== undefined && code !== null &&
            name !== '' && name !== undefined && name !== null &&
            id !== '' && id !== undefined && id !== null) {

            router.push('/')
        }
    }, [barcodeImgUrl, code, id, name, router])


    return (
        <>
    <Flex height="100vh" direction="column" alignItems="center" justifyContent="center" className={styles.background}>
    <Heading size="h1" color="white">학생증 바코드 등록하기</Heading>
        <div style={{ 'textAlign': 'center' }}>
        <input type="file" style={{ 'display': 'inline-block', 'width': '185px' }} placeholder="학생증 바코드 찍힌 사진을 넣으세요." accept="image/png, image/jpeg"  onChange={(e: React.ChangeEvent<{ files: FileList | null }>) => {
            if (e.target.files && e.target.files.length > 0) {
              const file = e.target.files[0];
              URL.revokeObjectURL(barcodeImgUrl);
              setBarcodeImgUrl((_pre: any) => URL.createObjectURL(file));
            }}} />
        </div>
        <Text textAlign="center">
            <strong>
                 바코드 찍힌 파일을 넣으시면
                <br/>
                자동으로 메인 페이지로 이동됩니다.
            </strong>
        </Text>
    </Flex>
        <FooterComponent isCode={false}/>
    </>
    )
}