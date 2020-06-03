import { Link } from '../routes'
import slug from '../helpers/slug'

function PodcastList({ audio_clips }) {
  console.log('audio_clips ::', audio_clips)
  return (
    <div className="audioClips">
      {
        audio_clips.map(clip => (
          <Link route='podcast' 
                params={{ slug: slug(clip.title), id: clip.id, slugChannel: slug(clip.channel.title), idChannel: clip.channel.id }} 
            key={ clip.id }
          >
            <a className="audioClip">
              <img
                src={ clip.channel.urls.logo_image.original }
                alt={ clip.title }
              />
              <h2>{ clip.title }</h2>
              <div className='meta'>
                { Math.ceil(clip.duration / 60) } minutes
              </div>
            </a>
          </Link>
        ))
      }

      <style jsx>
        {
          `
            .audioClips {
              display: grid;
              grid-gap: 15px;
              padding: 15px;
              grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            }

            a.audioClip {
              display: block;
              margin-bottom: 0.5em;
              color: #333;
              text-decoration: none;
            }

            .audioClip img {
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
          `
        }
      </style>
    </div>
  )
}

export default PodcastList