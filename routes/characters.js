//import express and express router 
const router = Router();
import * as charData from '../data/characters.js';
import help from '../helpers.js';

router.route('/').get(async (req, res) => {
  
  try{
    return res.render('home',{title:'Marvel Characters Found'})
  }
  catch(e){
    return res.status(500).render('error',{e: e,hasErrors:true,title:'Marvel Characters Found'});
  }
});

router.route('/searchmarvelcharacters').post(async (req, res) => {
  
  try{
    bodyData.searchCharacterByName= help.checkString(bodyData.searchCharacterByName,'Character Name');
  }
  catch(e){
    return res.status(400).render('error', {e: e, hasErrors: true,title:'Marvel Characters Found'})
  }

  try{
    const listResult = await charData.searchCharacterByName(bodyData.searchCharacterByName)
    return res.render('characterSearchResults',
    {title:'Marvel Characters Found',
    heading:bodyData.searchCharacterByName,
    result: listResult})
  }
  catch(e){
    return res.status(404).render('error',{e: e,charError:true,title:'Marvel Characters Found',charName:bodyData.searchCharacterByName});
  }
  
 
  
});

router.route('/marvelcharacter/:id').get(async (req, res) => {
  
  try {
    req.params.id = help.checkId(req.params.id,'ID');
  } catch (e) {
    return res.status(400).render('error', {e: e, hasErrors: true,title:'Marvel Characters Found'});
  }
  try{
    const resultById = await charData.searchCharacterById(req.params.id)
     return res.render('characterById',
     {title:resultById.name,
      heading: resultById.name,
      result:resultById})
  }
  catch(e){
    return res.status(404).render('error',{e:e,hasErrors: true,msg:'Character not found for given ID',title:'Marvel Characters Found'});
  }

});

export default router;
