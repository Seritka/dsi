import React, { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { Button, Flex, Heading, Text, Input } from "@chakra-ui/react"
import { secureStorage } from '@utils/secureStorage'
import dynamic from 'next/dynamic'
import styles from '@styles/Home.module.css'

const FooterComponent = dynamic(() => import('@components/Footer'))

export default function Register() {
    const [isPrivacy, setPrivacy] = useState<Boolean>(false)
    const [code, setCode] = useState<string>()
    const [name, setName] = useState<string>('')
    const [id, setID] = useState<string>('')
    const [_, setLoading] = useState<boolean>(false)
    const [isDisabled, setDisabled] = useState<boolean>(true)
    const router = useRouter()


    useEffect(() => {
        secureStorage.getItem('code').then((value: string) => value === undefined ? undefined : setCode(value))
        secureStorage.getItem('id').then((value: string) => value === undefined ?  undefined : setID(value))
        secureStorage.getItem('name').then((value: string) => value === undefined ? undefined : setName(value))

        if (code !== '' && code !== undefined && code !== null &&
            name !== '' && name !== undefined && name !== null &&
            id !== '' && id !== undefined && id !== null) {

            router.push('/')
        } else if (name !== '' && name !== undefined && name !== null &&
            id !== '' && id !== undefined && id !== null) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
        secureStorage.getItem('privacy').then((value: string) => setPrivacy(Boolean(value) ? true : false))
        return () => setLoading(true)
    }, [isPrivacy, code, router, name, id, setID, setName])

    if (isPrivacy) {
        //학년 이름 받기
        return (
            <>
            <Flex height="100vh" direction="column" alignItems="center" justifyContent="center" className={styles.background}>
                <Input
                    width="54%"
                    size="md"
                    value={name || ''}
                    type="text"
                    variant="Outline"
                    placeholder="본인의 이름을 입력하세요."
                    margin="15px"
                    onChange={(e) => setName(e.target.value)}
                     />
                <Input
                    width="54%"
                    size="md"
                    value={id || ''}
                    type="number"
                    variant="Outline"
                    onChange={(e) => setID(e.target.value)}
                    placeholder="본인의 학번을 입력하세요."
                    margin="15px"
                    />
                <Button bgColor="white" color="#5991CC" isDisabled={isDisabled} onClick={() => {
                    if (String(id).length === 5 && (Number(String(id).substr(0, 1)) >= 1 && Number(String(id).substr(0, 1)) <= 3) && (name.length >= 2 && name.length <= 5)) {
                        secureStorage.setItem('id', id)
                        secureStorage.setItem('name', name)
                        router.push('barcode')
                    }
                    // alert('이름과 학번으로 장난치면 안돼요, 여러분')
                }}>바코드 등록 하려 가기</Button>
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
                    <br/>
                    <Text as="u">학생의 이름 · 디지털 학생증 운영 · 3년</Text>
                    <br/>
                    <Text as="u">학생의 학번 · 디지털 학생증 운영 · 3년</Text>
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