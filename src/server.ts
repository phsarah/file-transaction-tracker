import { app } from './app';

console.log('app running on port: ', process.env.PORT || 3070);

/**
 * Por favor, não mude essa porta, mantenha a 3000, ela é CRUCIAL para o sucesso do deploy da
 * aplicação, caso precise mudar a porta que a aplicação escuta, use a variavel de ambiente PORT,
 * ao invés de mudar diretamente o número da porta
 * */
app.listen(process.env.PORT || 3070);