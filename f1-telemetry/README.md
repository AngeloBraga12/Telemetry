# Telemetria F1

Aplicação web independente para explorar sessões de Fórmula 1 com dados da [OpenF1](https://openf1.org/docs).

## Requisitos
Node.js 20+ e npm.

## Instalação e execução
```bash
npm install
cp .env.example .env.local
npm run dev
npm run typecheck
npm run lint
npm test
npm run build
```

## Variáveis de ambiente
`OPENF1_BASE_URL` (padrão `https://api.openf1.org/v1`) e `OPENF1_MAX_PER_MINUTE` (padrão `30`). Não é necessário segredo para dados históricos da OpenF1.

Consulte a documentação da OpenF1 para limitações, quotas e termos de uso dos dados.
