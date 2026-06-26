import React from 'react';
import styled from 'styled-components';

interface AnimatedInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AnimatedInput = ({ label, value, onChange }: AnimatedInputProps) => {
  return (
    <StyledWrapper>
      <div className="input-group">
        <input 
          required 
          type="text" 
          value={value}
          onChange={onChange}
          autoComplete="off" 
          className="input" 
        />
        <label className="user-label font-['Playfair_Display']">{label}</label>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  
  .input-group {
   position: relative;
   width: 100%;
  }

  .input {
   width: 100%;
   border: solid 1.5px rgba(255, 255, 255, 0.1);
   border-radius: 1rem;
   background: rgba(0, 0, 0, 0.4);
   padding: 1.25rem 1rem;
   font-size: 1rem;
   color: #f5f5f5;
   transition: border 150ms cubic-bezier(0.4,0,0.2,1);
   font-family: 'Playfair Display', serif;
  }

  .user-label {
   position: absolute;
   left: 15px;
   color: #a1a1aa; /* zinc-400 */
   pointer-events: none;
   transform: translateY(1.25rem);
   transition: 150ms cubic-bezier(0.4,0,0.2,1);
  }

  .input:focus, .input:valid {
   outline: none;
   border: 1.5px solid #FF5A5F;
  }

  .input:focus ~ label, .input:valid ~ label {
   transform: translateY(-50%) scale(0.8);
   background-color: #050505;
   padding: 0 .4em;
   color: #FF5A5F;
  }
`;

export default AnimatedInput;
