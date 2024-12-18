import passport from 'passport';
import dotenv from 'dotenv'
import User from '../models/userSchema.js';
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';

dotenv.config() // 환경변수를 들고 온다.

// 일반 로그인
// 화면에서 보낸 데이터의 key값과 일치시켜 검증한다.
const passportConfig = {
  //  여기서 email과 password는 input의 name 또는 리액트훅 폼의 register(변수)
  usernameField : 'email', passwordField : 'password'
}

const passportVerify = async (email, password, done) => {
  try {
    // 유저 아이디로 일치하는 유저 데이터 검색
    const foundUser = await User.findOne({ email : email }).lean()
    console.log("passport")
    console.log("email", email)
    console.log("password", password)

    if(!foundUser){
      // error, value, info
      return done(null, false, { message : "존재하지 않는 이메일입니다."})
    }

    // 비밀번호 검사
    // const passwordMatch = password === foundUser.password;
    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if(!passwordMatch){
      return done(null, false, { message : "올바르지 않은 비밀번호입니다."})
    }

    // 비밀번호, 아이디가 일치하는 사용자는 사용자 정보 반환
    // 
    return done(null, foundUser)


  } catch (error) {
    console.error("passportVerify error", error)
  }
}




// Passport로 전략들을 실행한다.
// passportConfig: 폼 데이터에서 사용할 필드 이름을 지정.
// passportVerify: 인증 검증 로직(사용자 확인 및 비밀번호 검사)이 담긴 콜백 함수.
const initializePassport = () => {
  passport.use('local', new LocalStrategy(passportConfig, passportVerify))
}

export { initializePassport }
