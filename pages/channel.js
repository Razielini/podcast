import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'
import PodcastListWithClick from '../components/PodcastListWithClick'
import Error from './_error'
import PodcastPlayer from '../components/PodcastPlayer'

export default class Channel extends React.Component {
  constructor(props) {
    super(props)
    this.state = { openPodcast: null }
  }

  openPodcast = (event, podcast) => {
    event.preventDefault()
    this.setState({
      openPodcast: podcast
    })
  }

  closePodcast = (event) => {
    event.preventDefault()
    this.setState({
      openPodcast: null
    })
  }

  render () {
    const { channel, audioClips, channelSeries, statusCode } = this.props
    const { openPodcast } = this.state

    if (statusCode !== 200) return <Error statusCode={ statusCode } />

    return (
      <div>
        <Layout title={channel.title}>
          <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />

          {
            openPodcast && 
            <div className="modal">
              <PodcastPlayer clip={ openPodcast } onClose={ this.closePodcast } />
            </div>
          }
      
          <h1>{ channel.title }</h1>
          <h2>Últimos Podcasts</h2>
          <PodcastListWithClick podcasts={ audioClips } onClickPodcast={ this.openPodcast } />

          { channelSeries.length > 0 &&
            <div>
              <h2>Series</h2>
              <ChannelGrid channels={ channelSeries } />
            </div>
          }

          <style jsx>{`
            .banner {
              width: 100%;
              padding-bottom: 25%;
              background-position: 50% 50%;
              background-size: cover;
              background-color: #aaa;
            }
            h1 {
              font-weight: 600;
              padding: 15px;
            }
            h2 {
              padding: 15px;
              font-size: 1.2em;
              font-weight: 600;
              margin: 0;
            }

            .modal {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: #000;
              z-index: 99999;
            }
          `}</style>
        </Layout>
      </div>
    )
  }
}

export async function getServerSideProps({ query, res }) {
  // console.log('getServerSideProps ::', query)
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

    // console.log('getInitialProps ::', channel)
    return { props: { channel, audioClips, channelSeries, statusCode: 200 } }
  } catch (error) {
    return { props: { channel: null, audioClips: null, channelSeries: null, statusCode: 503 } }
  }
}