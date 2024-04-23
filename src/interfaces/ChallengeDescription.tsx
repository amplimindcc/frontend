import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';
import { useState, type FC } from 'react';

import { Milkdown, useEditor } from '@milkdown/react'
import { commonmark } from '@milkdown/preset-commonmark';
import { nord } from '@milkdown/theme-nord';
import DescriptionModalData from './DescriptionData'
import '@milkdown/theme-nord/style.css';

export const ChallengeDescription: FC<DescriptionModalData> = (descriptionData) => {

    const [description, setDescription] = useState<string>(descriptionData.description);
    useEditor((root) => {
      return Editor
      .make()
      .config(ctx => {
        ctx.set(rootCtx, root)
        ctx.set(defaultValueCtx, descriptionData.description)
    })
      .config(nord)
      .use(commonmark)
  }, [])

  return <Milkdown />
}
