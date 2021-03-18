/*
 * Copyright 2021 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { errorHandler } from '@backstage/backend-common';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';
import { SearchQuery, SearchResultSet } from '../types';

type RouterOptions = {
  logger: Logger;
};

export async function createRouter({
  logger,
}: RouterOptions): Promise<express.Router> {
  const router = Router();

  router.get(
    '/query',
    async (
      req: express.Request<any, unknown, unknown, SearchQuery>,
      res: express.Response<SearchResultSet>,
    ) => {
      // @todo Actually transform req.params into search engine specific query.
      const { term, filters = {}, pageIndex = 0, pageSize = 30 } = req.query;
      logger.info(
        `Search requested received: ${term}, ${JSON.stringify(
          filters,
        )}, ${pageIndex}, ${pageSize}`,
      );

      try {
        // @todo Actually query search engine.
        // @todo And actually transform results into frontend-readable result
        res.send({
          results: [],
        });
      } catch (err) {
        logger.error(`There was a problem performing the search query.`);
        throw new Error(`There was a problem performing the search query.`);
      }
    },
  );

  router.use(errorHandler());
  return router;
}
