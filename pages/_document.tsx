import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

const APP_NAME = '행신고등학교 디지털 학생증'
const APP_DESCRIPTION = '디지털로 만나다, 행신고 학생증'
const APP_DOMAIN = 'https://dsi.jungeon.cc/'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return await Document.getInitialProps(ctx)
  }

  render() {
    return (
      <Html lang='en' dir='ltr'>
        <Head>
          <link rel="icon" href="/icons/favicon.ico" />
          <meta charSet="utf-8" />
          <meta name='application-name' content={APP_NAME} />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content={APP_NAME} />
          <meta name='description' content={APP_DESCRIPTION} />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='theme-color' content='#5991CC' />
          {/* TIP: set viewport head meta tag in _app.js, otherwise it will show a warning */}

          <link rel='apple-touch-icon' href='/icons/touch-icon-iphone.png' />
          <link rel='apple-touch-icon' sizes='152x152' href='/icons/iOS/touch-icon-ipad.png' />
          <link rel='apple-touch-icon' sizes='180x180' href='/icons/iOS/touch-icon-iphone-retina.png' />
          <link rel='apple-touch-icon' sizes='167x167' href='/icons/iOS/touch-icon-ipad-retina.png' />

          <meta name='twitter:card' content='summary' />
          <meta name='twitter:url' content={APP_DOMAIN} />
          <meta name='twitter:title' content={APP_NAME} />
          <meta name='twitter:description' content={APP_DESCRIPTION} />
          <meta name='twitter:image' content='/icons/Android/Icon-192.png' />
          <meta name='twitter:creator' content='@codIT' />
          <meta property='og:type' content='website' />
          <meta property='og:title' content={APP_NAME} />
          <meta property='og:description' content={APP_DESCRIPTION} />
          <meta property='og:site_name' content={APP_NAME} />
          <meta property='og:url' content={APP_DOMAIN} />
          <meta property='og:image' content='/icons/iOS/touch-icon-iphone.png' />

          {/* apple splash screen images */}

          <link rel='apple-touch-startup-image' href='/images/apple_splash_2048.png' sizes='2048x2732' />
          <link rel='apple-touch-startup-image' href='/images/apple_splash_1668.png' sizes='1668x2224' />
          <link rel='apple-touch-startup-image' href='/images/apple_splash_1536.png' sizes='1536x2048' />
          <link rel='apple-touch-startup-image' href='/images/apple_splash_1125.png' sizes='1125x2436' />
          <link rel='apple-touch-startup-image' href='/images/apple_splash_1242.png' sizes='1242x2208' />
          <link rel='apple-touch-startup-image' href='/images/apple_splash_750.png' sizes='750x1334' />
          <link rel='apple-touch-startup-image' href='/images/apple_splash_640.png' sizes='640x1136' />
          {/* 주소창 등의 웹 브라우저 UI를 표시하지 않기 */}
          <meta name="apple-mobile-web-app-capable" content="yes"/>
          {/* 상태 바의 스타일을 지정 */}
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
          {/* 홈 화면에서 표시되는 앱 이름을 지정  */}
          <meta name="apple-mobile-web-app-title" content={APP_NAME}/>
          {/* 홈 화면에서 표시되는 앱 아이콘을 지정 */}
          <link rel="apple-touch-icon" href="icons/iOS/icon-152.png"/>
          {/* https://ui.toast.com/weekly-pick/ko_202012101720 */}
          <link rel="preconnect" href={APP_DOMAIN} />
          <link rel="dns-prefetch" href={APP_DOMAIN} />


          <link rel='manifest' href='/manifest.json' />
          <link rel='shortcut icon' href='/icons/192.ico' />
          <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css" />
          <script dangerouslySetInnerHTML={{ __html: `
            if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
              __REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function() {};
            }`
          }}/>
        </Head>
        <title>행신고등학교 디지털 학생증</title>
        <body>
          <noscript>You should use javascript</noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}