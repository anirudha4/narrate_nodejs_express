const https = require('https')

// TODO: Set PENDO_TRACK_EVENT_SECRET environment variable with your Pendo integration key.
// This is required for server-side track events to be sent to Pendo.
const PENDO_TRACK_EVENT_SECRET = process.env.PENDO_TRACK_EVENT_SECRET

function pendoTrack(event, visitorId, accountId, properties) {
    if (!PENDO_TRACK_EVENT_SECRET) {
        return
    }

    const payload = JSON.stringify({
        type: 'track',
        event: event,
        visitorId: visitorId || 'anonymous',
        accountId: accountId || 'system',
        timestamp: Date.now(),
        properties: properties || {}
    })

    const options = {
        hostname: 'data.pendo-dev.pendo-dev.com',
        path: '/data/track',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-pendo-integration-key': PENDO_TRACK_EVENT_SECRET
        }
    }

    try {
        const req = https.request(options, (res) => {
            res.resume()
        })
        req.on('error', (err) => {
            console.error('Pendo track error:', err.message)
        })
        req.write(payload)
        req.end()
    } catch (err) {
        console.error('Pendo track error:', err.message)
    }
}

module.exports = pendoTrack
