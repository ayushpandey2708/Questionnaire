// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Post from 'mdi-material-ui/Post'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import ViewDashboard from 'mdi-material-ui/ViewDashboard'
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import Table from 'mdi-material-ui/Table'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },

    // {
    //   title: 'Account Settings',
    //   icon: AccountCogOutline,
    //   path: '/account-settings'
    // },
    // {
    //   sectionTitle: 'Pages'
    // },
    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/pages/login',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Logout',
    //   icon: LogoutVariant,
    //   path: '/pages/login',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Register',
    //   icon: AccountPlusOutline,
    //   path: '/pages/register',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Error',
    //   icon: AlertCircleOutline,
    //   path: '/pages/error',
    //   openInNewTab: true
    // },
    {
      sectionTitle: 'Crud Operations'
    },
    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/typography'
    // },
    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended
    // },
    {
      title: 'Posts',
      icon: Post,
      path: '/posts'
    },
    // {
    //   title: 'Add Post',
    //   icon: CubeOutline, 
    //   path: '/add-post'
    // },
    // {
    //   title: 'Add User',
    //   icon: Table,
    //   path: '/add-user'
    // },
    {
      title: 'Users',
      icon: ViewDashboard,
      path: '/user-list'
    },

    {
      title: 'Roles',
      icon: AccountCogOutline,
      path: '/roles'
    },
    
    // {
    //   title: 'Add Permission',
    //   icon: CubeOutline,
    //   path: '/permission'
    // },
    {
      title: 'Permissions',
      icon: AccountCogOutline,
      path: '/view-permissions'
    }
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  ]
}

export default navigation
