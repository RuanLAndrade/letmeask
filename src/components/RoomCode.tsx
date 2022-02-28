import copyImg from '../assets/images/copy.svg';
import '../styles/room-code.scss';

type RoomCodeProps = {
  code: String;
}

export function RoomCode (props: RoomCodeProps) {

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText('-MwjbjMyGSabau-rtI7o');
  }
  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  ); 
}