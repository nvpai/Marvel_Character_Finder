//import route files and export them

import charRoutes from './characters.js';

const constructorMethod = (app) => {
    app.use('/',charRoutes);
    app.use('/searchmarvelcharacters', charRoutes);
    app.use('/marvelcharacter',charRoutes);
    app.use('*', (req, res) => {
        return res.status(404).render('error', {e: 'Route not Found', hasErrors: true,title:'Marvel Characters Found'});
    });
}
export default constructorMethod;
