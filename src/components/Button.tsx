// type ButtonProps = {
//    children?: string; // Colocar o ponto de interrogação deixa opcional o atributo
//   //  text?: Array<string>; ARRAY DE STRING
//   // text?: string[]; identifica STRING E DEPOIS SETA ARRAY
// }

// import { useState } from "react";

import { ButtonHTMLAttributes } from 'react';

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button ({isOutlined = false, ...props}: ButtonProps) {
      return (
        <button className={`button ${isOutlined ? 'outlined' : ''}`}
        {...props} />
  )
}

//DOIS ENSINAMENTOS IMPORTANTES :
// O REPASSE DE PROPS desse botão para o button HTML.
// - Importante falar quais são os atributos.


// NAMED EXPORT
// export default Button;