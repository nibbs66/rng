import { withAuth } from "next-auth/middleware"

export default withAuth({

        callbacks: {

            authorized: ({ token }) => token?.isEmployee === true || token?.isAdmin === true,
        }


})
