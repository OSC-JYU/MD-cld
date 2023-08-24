const Koa			= require('koa');
const Router		= require('koa-router');
const { koaBody }	= require('koa-body');
const json			= require('koa-json')
const cld           = require('cld');


var app				= new Koa();
var router			= new Router();

app.use(json({ pretty: true, param: 'pretty' }))
app.use(koaBody());



// ******* ROUTES ************

router.get('/', function (ctx) {
	ctx.body = 'md-cld API'
})

router.post('/process', async function (ctx) {

    let output = {response: {
        type: "stored",
        uri: []
    }}

    console.log(ctx.request.body)

	ctx.body = await detect(ctx.request.body)
})


// ******* ROUTES ENDS ************


app.use(router.routes());

var set_port = process.env.PORT || 8300
var server = app.listen(set_port, function () {
   var host = server.address().address
   var port = server.address().port

   console.log('md-cld running at http://%s:%s', host, port)
})




async function detect(body) {
    if(!body || !body.content) return {}
    if(!body.params) {
        body.params = {}
    }

    const result = await cld.detect(body.content, body.params);
    return result
}

