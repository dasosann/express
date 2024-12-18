import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import passport from 'passport'

dotenv.config() // 환경 변수
const SECRET_KEY = process.env.SECRET_KEY;

const localStrategy = async (req, res, next) => {
  try {
    // done(error, value, info)
    const error = req.error; 
    const authenticatedUser = req.user; // 인증된 유저 정보
    const info = req.info;

    if(error || !authenticatedUser){
      res.status(400).json(
        {
          loginSucess : false,
          message : info.message
        }
      )
    }

    // 로그인 처리
    req.login(authenticatedUser, { session: false}, async (loginError) => {
      // 오류가 있다면
      if(loginError){
        return res.send(loginError)
      }
      
      // 정상 로그인, JWT 생성 후 반환
      // jwt.sign(config, secretKey, expireTime)
      const jwtToken = jwt.sign(
        {
          email : authenticatedUser.email,
          name : authenticatedUser.name,
          issuer : "dasosan" // 발급자
        },
        SECRET_KEY,
        {
          expiresIn : "24h"
        }
      )
      console.log("jwt token", jwtToken)
      console.log("user", authenticatedUser)
      // 화면에 토큰만 보내준다.
      res.status(200).json({
        message : "로그인 성공하였습니다.",
        loginSuccess : true,
        jwtToken : jwtToken
      })
    })


  } catch (error) {
    console.error("localStrategy error", error)
  }
}

export { localStrategy }