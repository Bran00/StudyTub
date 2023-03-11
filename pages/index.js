import React from "react";

import config from "../config.json";

import styled from "styled-components";

import { CSSReset } from "../src/components/CSSReset";

import Menu from "../src/components/Menu";

import { StyledTimeline } from "../src/components/Timeline";

import { videoService } from "../src/services/videoService";




function HomePage() {
  const service = videoService();
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");
  const [playlists, setPlaylists] = React.useState({ jogos: []});
  //
  
  React.useEffect(() => {
  service.getAllVideos()
  .then((dados) => {
    const novasPlaylists = { ...playlists }
    dados.data.forEach((video) => {
      if (!novasPlaylists[video.playlist]) {
        novasPlaylists[video.playlist] = []
      }
      playlists[video.playlist]?.push(video)
    })
    setPlaylists({ ...playlists })
  })
  
  }, []);

  return (
    <>
      <div>
        <CSSReset />
        <Menu
          valorDoFiltro={valorDoFiltro}
          setValorDoFiltro={setValorDoFiltro}
        />
        <Header />
        <Timeline searchValue={valorDoFiltro} playlists={config.playlists} />
      </div>
    </>
  )
}

export default HomePage

/*function Menu() {
   return (
    <styledMenu>
      <div>
        <Logo />
      </div>
        <Search />
    </styledMenu>
   )
}*/

const StyleHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`

const StyleBanner = styled.div`
  background-color: blue;
  background-image: url(${({ bg}) => bg});
  height: 230px;
  background-position: 50% 25%;
`;

function Header() {
   return (

     //<img src="banner" />//
     <StyleHeader>
       <StyleBanner bg={config.bgLight} />
       <section className="user-info">
         <img src={`https://github.com/${config.github}.png`} />
         <div>
           <h2>
            {config.name}
           </h2>
           <p>
            {config.job}
           </p>
         </div>
       </section>
     </StyleHeader>
   )
}

function Timeline({searchValue, ...propriedades}){
  const playlistNames = Object.keys(propriedades.playlists)
  

   return (
     <StyledTimeline>
      
       {playlistNames.map((playlist) => {
         const videos = propriedades.playlists[playlist];

         return (
           <section key={playlist}>
             <h2>{playlist}</h2>=
             <div>
               {videos
                 .filter((videos) => {
                   const titleNormalized = videos.title.toLowerCase()

                   const searchValueNormalized = searchValue.toLowerCase()

                   return titleNormalized.includes(searchValueNormalized)
                 })
                 .map((video) => {
                   return (
                     <a href={video.url} target="_blank" key={video.url}>
                       <img src={video.thumb} />
                       <span>{video.title}</span>
                     </a>
                   )
                 })}
             </div>
           </section>
         )
       })}
     </StyledTimeline>
   )
}