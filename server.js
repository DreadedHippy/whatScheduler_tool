import http from 'http'
import main from './backend/app.mjs';
// import debug from ('debug')('node-angular')
const server = http.createServer(main.app);
const port = 3000;

main.app.set('port', port);
let flag = false

function waitFor(conditionFunction) {
  const poll = resolve => {
    if(conditionFunction()) resolve();
    else {
			setTimeout(_ => poll(resolve), 4000)
			flag = main.getState()
		};
  }

  return new Promise(poll);
}

waitFor(_ => flag === true)
  .then(_ => {
		server.listen(process.env.PORT || port);
		console.log('Listening for messages')
	})
;
