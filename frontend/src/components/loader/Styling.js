import styled, { keyframes } from 'styled-components';


div>div {
  background: #fff;
  border-radius: 100%;
  height: 50px;
  margin: 40px;
  width: 50px;
}

.wrapper {
  position: absolute;
}

 const wrapper = styled.div`
  :nth-of-type(2) {
    height: 40px;
    width: 40px;
    opacity: 0.8;
  }
 `:nth-of-type(2)>div {
    height: 40px;
    width: 40px;
    opacity: 0.8;
  }

  .wrapper:nth-of-type(3)>div {
    height: 30px;
    width: 30px;
    opacity: 0.6;
  }

  .wrapper:nth-of-type(4)>div {
    height: 20px;
    width: 20px;
    opacity: 0.4;
  }

  .wrapper:nth-of-type(5)>div {
    height: 10px;
    width: 10px;
    opacity: 0.2;
  }

.wrapper {
  animation: x 1s ease-in-out alternate infinite 0s both;
}

.wrapper > div {
  animation: y 1s linear infinite 0s both;
}

.wrapper:nth-of-type(2),
.wrapper:nth-of-type(2) > div {
  animation-delay: 0.1s;
}
.wrapper:nth-of-type(3),
.wrapper:nth-of-type(3) > div {
  animation-delay: 0.2s;
}
.wrapper:nth-of-type(4),
.wrapper:nth-of-type(4) > div {
  animation-delay: 0.3s;
}
.wrapper:nth-of-type(5),
.wrapper:nth-of-type(5) > div {
  animation-delay: 0.4s;
}


@-webkit-keyframes x {
  0% {
            transform: translate(-100px, 0);
  }
  100% {
            transform: translate(100px, 0)
  }
}

@keyframes x {
  0% {
            transform: translate(-100px, 0);
  }
  100% {
            transform: translate(100px, 0)
  }
}


@keyframes y {
  25% {
    transform: translate(0, -50px);
  }
  0%, 50%, 100% {
    transform: translate(0, 0);
  }
  75% {
    transform: translate(0, 50px);
  }

}