import { Link } from '../routes'
import slug from '../helpers/slug'

function ChannelGrid({ channels }) {
  console.log('channels ::', channels)
    return (
      <div>
        <div className="channels">
          {
            channels.map((channel) => (
              <Link route='channel' 
                params={{ slug: slug(channel.title), id: channel.id }} 
                key={`${channel.id}-${Math.random()}`}
              >
                <a className="channel">
                  { channel.title }
                  <img src={ channel.urls.logo_image.original } alt={ channel.id } />
                </a>
              </Link>
            ))
          }
        </div>

        <style jsx>{`
          header {
            color: #FFF;
            background: #8756CA;
            padding: 15px;
            text-align: center;
          }
          .channels {
            display: grid;
            grid-gap: 15px;
            padding: 15px;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          }
          a.channel {
            display: block;
            margin-bottom: 0.5em;
            color: #333;
            text-decoration: none;
          }
          .channel img {
            border-radius: 3px;
            box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
            width: 100%;
          }
          h2 {
            padding: 5px;
            font-size: 0.9em;
            font-weight: 600;
            margin: 0;
            text-align: center;
          }
      `}</style>
      </div>
    )
}

export default ChannelGrid