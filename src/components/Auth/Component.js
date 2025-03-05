import styled from "styled-components";

export const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 1000px;
  max-width: 100%;
  min-height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d4af37;
`;

export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${({ signinIn }) =>
    !signinIn &&
    `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  `}
`;

export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${({ signinIn }) =>
    !signinIn &&
    `
    transform: translateX(100%);
  `}
`;

export const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  font-weight: bold;
  margin: 0;
  font-size: 24px;
  color: #000;
  padding: 30px;
`;

export const Input = styled.input`
  background-color: #eee;
  border: 1px solid #d4af37;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  border-radius: 5px;
  font-size: 16px;
  color: #000;
  &:focus {
    outline: none;
    border: 2px solid #c8102e;
    background-color: #fff;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px 15px;
  margin: 8px 0;
  border-radius: 5px;
  border: 1px solid #d4af37;
  background-color: #eee;
  font-size: 16px;
  &:focus {
    outline: none;
    border: 2px solid #c8102e;
    background-color: #fff;
  }
`;

export const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #d4af37;
  background-color: #d4af37;
  color: #000;
  font-size: 14px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
  margin: 30px;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: #b8972d;
  }
`;

export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #d4af37;
  color: #d4af37;
  padding: 20px;
`;

export const Anchor = styled.a`
  color: #000;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;

export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${({ signinIn }) =>
    !signinIn &&
    `
    transform: translateX(-100%);
  `}
`;

export const Overlay = styled.div`
  background: linear-gradient(to right, #d4af37, #c8102e);
  color: #000;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${({ signinIn }) =>
    !signinIn &&
    `
    transform: translateX(50%);
  `}
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${({ signinIn }) =>
    !signinIn &&
    `
    transform: translateX(0);
  `}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${({ signinIn }) =>
    !signinIn &&
    `
    transform: translateX(20%);
  `}
`;

export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
  color: #000;
`;

export const ErrorMessage = styled.p`
  color: #c8102e;
  font-size: 14px;
  margin: 10px 0;
`;
