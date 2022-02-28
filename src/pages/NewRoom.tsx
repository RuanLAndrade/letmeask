import { useAuth } from '../hooks/useAuth';
import { Link, useHistory } from 'react-router-dom'
import {FormEvent, useState} from 'react';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss';
import { database, ref, set, push } from '../services/firebase';


export function NewRoom () {
  const { user }  = useAuth();
  const history = useHistory();

  const [ newRoom, setNewRoom ] = useState('');

  async function handleCreateRoom (event: FormEvent) {
    event.preventDefault();
    // O TRIM SERVER PRA VALIDAR SE O USUÁRIO NÂO DIGITOU APENAS SPAÇO NO CAMPO DE TEXTO
    if(newRoom.trim() === '') {
      return;
    }

    const roomRef = ref(database,'rooms');

      const firebaseRoom = push(roomRef); // Sempre que vai salvar info dentro de uma lista no firebase
    
    set(firebaseRoom, {
      title: newRoom,
      authorID: user?.id

    })

    history.push(`/rooms/${firebaseRoom.key}`)
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
          <h2>Crie uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
            type="text"
            placeholder="Nome da sala"
            onChange={event => setNewRoom(event.target.value)}
            value={newRoom}
            />
            <Button type="submit">
              Criar sala
              </Button>
          </form>
          <p>Quer entrar em uma sala existente ? <Link to="/">Clique aqui</Link></p>
        </div>
      </main>
    </div>
  

  );
}

