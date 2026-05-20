{\rtf1\ansi\ansicpg1252\cocoartf2709
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 export default async function handler(req, res) \{\
    // Set permissive CORS parameters so it works seamlessly during local testing\
    res.setHeader('Access-Control-Allow-Origin', '*');\
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');\
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');\
\
    if (req.method === 'OPTIONS') \{\
        return res.status(200).end();\
    \}\
\
    const \{ query \} = req.query;\
    if (!query) \{\
        return res.status(400).json(\{ error: 'Missing SPARQL target query parameters.' \});\
    \}\
\
    // Construct the canonical institutional endpoint\
    const targetUrl = `https://publications.europa.eu/webapi/rdf/sparql?query=$\{encodeURIComponent(query)\}&format=application%2Fsparql-results%2Bjson`;\
\
    try \{\
        const response = await fetch(targetUrl, \{\
            method: 'GET',\
            headers: \{\
                // Identity-First Networking: Dictate your official research footprint securely\
                'User-Agent': 'AcademicCitationGenerator/1.0 (ClassmateResearchTool; contact: university-project@domain.com)',\
                'Accept': 'application/sparql-results+json'\
            \}\
        \});\
\
        if (!response.ok) \{\
            return res.status(response.status).json(\{ error: `EU CELLAR database returned status code: $\{response.status\}` \});\
        \}\
\
        const data = await response.json();\
        return res.status(200).json(data);\
\
    \} catch (error) \{\
        return res.status(500).json(\{ error: 'Internal Serverless Proxy Failure', details: error.message \});\
    \}\
\}}
