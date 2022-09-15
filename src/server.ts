import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHoursString } from './utils/convert-minutes-to-hour-string';

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient({
  log: [ 'query' ]
});

app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  });

  return response.json(games);
});



app.listen(3333);