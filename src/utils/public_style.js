import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
`;

export const MainTitle = styled.img`
    width: ${(props) => (props.banner ? '150px' : '350px')};
    padding: ${(props) => (props.banner ? '0 0 0 20px' : '0 0 50px 0')};
    cursor: ${(props) => (props.banner ? 'pointer' : null)};

    @media (max-width: 770px) {
        width: ${(props) => (props.banner ? '100px' : '280px')};
        padding: ${(props) => (props.banner ? '0 0 0 20px' : '50px 0 10px 0')};
    }
`;

export const ContentsContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 0;
`;

export const MainBox = styled.div`
    width: 100%;
    margin-top: -100px;
    text-align: -webkit-center;
    position: absolute;
`;

export const MainButtonBox = styled.div`
    @media (max-width: 770px) {
        > div {
            &:first-child {
                padding-top: 50px;
            }
        }
    }
`;

export const ReCaptchaBox = styled.div`
    margin-top: -110px;
    text-align: -webkit-center;
    position: absolute;
    left: 50%;
    transform: translateX(260px);

    @media (max-width: 770px) {
        transform: translateX(-152px);
    }
`;

export const HeaderBox = styled.div`
    width: 100%;
    height: 50px;
    top: 20px;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
    display: flex;
    position: absolute;
`;

export const NetworkBox = styled.div`
    top: 20px;
    right: 20px;
    text-align: -webkit-center;
    position: absolute;
`;

export const LogBox = styled.div`
    max-width: 600px;
    padding: 50px 10px 80px 10px;
    position: absolute;
    top: 60vh;
    @media (max-width: 770px) {
        max-width: 350px;
        padding: 60px 10px 80px 10px;
        position: absolute;
        top: 65vh;
    }
`;

export const LogCardWrapper = styled.div`
    width: 100%;
    justify-content: space-between;
    align-items: center;
    display: flex;
`;

export const LogSendTag = styled.div`
    backgroundcolor: rgba(43, 168, 145, 0.2);
    borderradius: 5px;
    padding: 10px;
    color: #2ba891;
    width: 50px;
    textalign: center;
`;

export const FooterBox = styled.div`
    width: 100%;
    height: 80px;
    align-items: center;
    justify-content: space-between;
    display: flex;
    position: fixed;
    bottom: 0;
    background-color: #131316;

    @media (max-width: 770px) {
        display: inline-block;
        text-align: right;
        height: 70px;
    }
`;

export const Wrapper = styled.div`
    width: 100%;
    text-align: ${(props) => (props.drawer ? `-webkit-right;` : `-webkit-center;`)}
    padding: ${(props) => (props.drawer ? `0;` : `10px 0;`)}
`;

export const MainButtonWrapper = styled.div`
    width: 500px;
    justify-content: space-around;
    display: flex;
    @media (max-width: 770px) {
        width: 100%;
        display: block;
    }
`;

export const BackgroundBox = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -90;
`;

export const BackgroundBlur = styled.div`
    background-color: #000;
    opacity: 0.6;
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -80;
`;

export const NftCardTextBox = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: baseline;
    padding: 5px 0;
`