import { defaultValueCtx, Editor, rootCtx, commandsCtx, CmdKey  } from '@milkdown/core';
import { useState, type FC } from 'react';

import { Milkdown, useEditor } from '@milkdown/react'
import { commonmark, toggleEmphasisCommand, wrapInHeadingCommand, insertHardbreakCommand,
        toggleStrongCommand, turnIntoTextCommand, wrapInOrderedListCommand, wrapInBulletListCommand   } from '@milkdown/preset-commonmark';
import { nord } from '@milkdown/theme-nord';
import DescriptionModalData from './DescriptionData'
import '@milkdown/theme-nord/style.css';
import '../pages/Admin/components/Challenges/Challenges.css'
import italicIcon from '../assets/italic-icon.png'
import headerIcon from '../assets/header-icon.png'
import boldIcon from '../assets/bold-icon.png'
import listIcon from '../assets/list-icon.png'

export const ChallengeDescription: FC<DescriptionModalData> = (descriptionData) => {


    function executeCommand(key: CmdKey<any>){
        editor.get()?.action((ctx) => {
            // get command manager
            const commandManager = ctx.get(commandsCtx);

            // call command
            commandManager.call(key);
          });
    }

    const toggleItalic = () => executeCommand(toggleEmphasisCommand.key);

    const toggleHeading = () => executeCommand(wrapInHeadingCommand.key);

    const toggleStrong = () => executeCommand(toggleStrongCommand.key);

    const toggleList = () => executeCommand(wrapInBulletListCommand.key);

    const editor = useEditor((root) => {
      return Editor
      .make()
      .config(ctx => {
        ctx.set(rootCtx, root)
        ctx.set(defaultValueCtx, descriptionData.description)
    })
      .config(nord)
      .use(commonmark)
  }, [])

  return (
    <div className='description'>
        <div className='description-menu-bar'>
            <button className='description-menu-button' onClick={toggleItalic}><img width={15} height={15} className='description-menu-image' src={italicIcon}></img></button>
            <button className='description-menu-button' onClick={toggleStrong}><img width={15} height={15} className='description-menu-image' src={boldIcon}></img></button>
            <button className='description-menu-button' onClick={toggleHeading}><img width={15} height={15} className='description-menu-image' src={headerIcon}></img></button>
            <button className='description-menu-button' onClick={toggleList}><img width={15} height={15} className='description-menu-image' src={listIcon}></img></button>
        </div>
        <Milkdown/>
    </div>
  )
}
