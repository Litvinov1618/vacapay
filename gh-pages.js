var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'deploy-ghpages',
        repo: 'https://github.com/Litvinov1618/vacapay',
        user: {
            name: 'Aleksandr Litvinov', // update to use your name
            email: 'litvinov1618@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)