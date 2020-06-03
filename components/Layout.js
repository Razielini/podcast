import { Link } from '../routes'
import Head from 'next/head'

function Layout ({ children, title }) {
  return (
    <div>
      <Head>
        <title>{ title }</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Link href="/">
          <a>
            Podcast
          </a>
        </Link>
      </header>

      { children }

      <style jsx>{`
        header {
          color: #FFF;
          background: #8756CA;
          padding: 15px;
          text-align: center;
        }

        header a {
          color #FFF;
          text-decoration: none;
        }
      `}</style>
      <style jsx global>{`
        body {
          margin: 0;
          background: #FFF;
          font-family: system-ui;
        }
      `}</style>
    </div>
  )
}

export default Layout