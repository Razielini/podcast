import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'
import PodcastList from '../components/PodcastList'
import Error from './_error'

function Channel ({ channel, audioClips, channelSeries, statusCode }) {
  if (statusCode !== 200) return <Error statusCode={ statusCode } />

  return (
    <div>
      <Layout title={channel.title}>
        <h2>Últimos Podcasts</h2>
        <PodcastList audio_clips={ audioClips } />
        <h2>Series</h2>
        <ChannelGrid channels={ channelSeries } />
      </Layout>
    </div>
  )
}

export const getServerSideProps = async ({ query, res }) => {
  console.log('getServerSideProps ::', query)
  try {
    let idChannel = query.id

    let [reqChannel, reqAudios, reqSeries] = await Promise.all([
      fetch(`https://api.audioboom.com/channels/${idChannel}`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
    ])

    if (reqChannel.status >= 404) {
      res.statusCode = reqChannel.status
      return { props: { channel: null, audioClips: null, channelSeries: null, statusCode: reqChannel.status } }
    }

    let dataChannel = await reqChannel.json()
    let channel = dataChannel.body.channel

    let dataAudios = await reqAudios.json()
    let audioClips = dataAudios.body.audio_clips

    let dataSeries = await reqSeries.json()
    let channelSeries = dataSeries.body.channels

    console.log('getInitialProps ::', channel)
    return { props: { channel, audioClips, channelSeries, statusCode: 200 } }
  } catch (error) {
    return { props: { channel: null, audioClips: null, channelSeries: null, statusCode: 503 } }
  }
}

export default Channel