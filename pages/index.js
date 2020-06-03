import 'isomorphic-fetch'
import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'
import Error from './_error'

function App ({ channels, statusCode }) {
  if (statusCode !== 200) return <Error statusCode={ statusCode } />

  return(
    <div>
      <Layout title="Podcast">
        <ChannelGrid channels={ channels } />
      </Layout>
    </div>
  )
}

export async function getServerSideProps({ res }) {
  try {
    let req = await fetch('https://api.audioboom.com/channels/recommended')
    let { body :channels } = await req.json()

    return { props: { channels:channels, statusCode: 200 } }
  } catch (error) {
    res.statusCode = 503
    return { props: { channels: null, statusCode: 503 } }
  }
}

export default App