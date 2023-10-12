import './MakePlaylistButton.scss';

function MakePlaylistButton({ trackIds, accessToken, onClick }) {  

    const handleButtonClick = async () => {  

        async function fetchWebApi(endpoint, method, body) {
            const res = await fetch(`https://api.spotify.com/${endpoint}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,  
                },
                method,
                body: body ? JSON.stringify(body) : undefined  
            });
            return await res.json();
        }

        const tracksUri = trackIds.map(id => `spotify:track:${id}`);  

        async function createPlaylist(tracksUri) {
            const { id: userId } = await fetchWebApi('v1/me', 'GET');

            const playlist = await fetchWebApi(
                `v1/users/${userId}/playlists`, 'POST', {
                    "name": "My 2023 SummerSoundWave",
                    "description": "Playlist created by Mandy",
                    "public": false
                });

            await fetchWebApi(
                `v1/playlists/${playlist.id}/tracks`, 'POST', { uris: tracksUri });  

            return playlist;
        }

        const createdPlaylist = await createPlaylist(tracksUri);  
        console.log(createdPlaylist.name, createdPlaylist.id);
        onClick();
    }

    return (
        <section>
            <h3>Let's make them a Playlist</h3>
            <button className='button__make-playlist' onClick={handleButtonClick}>Make Playlist</button>
        </section>
    )
}

export default MakePlaylistButton;