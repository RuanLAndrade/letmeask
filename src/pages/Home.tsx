import { useAuth } from '../hooks/useAuth';
import { useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss';

import { Button } from '../components/Button';
import { FormEvent, useState } from 'react';
import { ref, get, database, child } from '../services/firebase';


// WEBPACK (snowpack, vite, ...)

export function Home () {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if(!user) {
      signInWithGoogle();
    }
    history.push('/rooms/new');

  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault(); //Usado em todo formulário do REACT

    if(roomCode.trim() === '') {
      return;
    }
    const roomRef = ref(database);
    get(child(roomRef,`rooms/${roomCode}`)).then((room) => {
      console.log(room);
      if(!room.exists()) {
        alert('Room does not exists.');
        return;
      }
      
      history.push(`rooms/${roomCode}`);
        
    })    
    // if(!roomRef) {
    //   alert('Room does not exists.')
    //   return;
    // }


   
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas"/>
        <strong>Crie Salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        {/* Utilizado className para o react não confundir sintaxe JS class */}
        <div className="main-content" >
          <img src={logoImg} alt="Letmeask"/>
          <button onClick={handleCreateRoom} className="create-room">            
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">Ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input 
            type="text"
            placeholder="Digite o código da sala"
            onChange={event => setRoomCode(event.target.value)}
            value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
              </Button>
          </form>
        </div>
      </main>
    </div>
  )
}