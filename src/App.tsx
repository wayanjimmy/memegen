import React, { useState } from 'react'
import { NavbarBrand, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Button } from 'reactstrap'

import { useOnMount } from './hooks'
import './App.css'

interface MemeImage {
  src: string
}

enum TextType {
  Top = 'toptext',
  Bottom = 'bottomtext'
}

const photos: MemeImage[] = [
  { src: '/images/vict-baby.png' },
  { src: '/images/ned.jpeg' },
  { src: '/images/devilgirl.jpg' },
  { src: '/images/trump.jpg' },
  { src: '/images/one-does-not.jpg' },
  { src: '/images/dank.png' },
  { src: '/images/boy.png' },
  { src: '/images/sad.png' },
  { src: '/images/wolf.png' },
  { src: '/images/fry.jpg' },
  { src: '/images/jobs.jpg' },
  { src: '/images/phone.jpg' },
  { src: '/images/oldie.png' },
  { src: '/images/image.png' },
  { src: '/images/doubt.png' },
  { src: '/images/crying.png' },
  { src: '/images/sponge.png' },
  { src: '/images/dog.png' },
  { src: '/images/frust.png' },
  { src: '/images/web.png' },
  { src: '/images/penguin.png' }
]

function App() {
  let [topText, setTopText] = useState<string>('')
  let [bottomText, setBottomText] = useState<string>('')
  let [isTopDragging, setIsTopDragging] = useState<boolean>(false)
  let [isBottomDragging, setIsBottomDragging] = useState<boolean>(false)
  let [currentImage, setCurrentImage] = useState<number>(0)
  let [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  let [currentImagebase64, setCurrentImagebase64] = useState<string | undefined>(undefined)
  let [topY, setTopY] = useState<string>('10%')
  let [topX, setTopX] = useState<string>('50%')
  let [bottomX, setBottomX] = useState<string>('50%')
  let [bottomY, setBottomY] = useState<string>('90%')

  let toggleModal = (): void => {
    setModalIsOpen(!modalIsOpen)
  }

  let getBase64Image = (img: HTMLImageElement): string => {
    let canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    let ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.drawImage(img, 0, 0)
    }

    return canvas.toDataURL('image/png')
  }

  let openImage = (index: number) => {
    let image = photos[index]
    let baseImage = new Image()
    baseImage.src = image.src
    let currentImagebase64 = getBase64Image(baseImage)

    console.log(currentImagebase64)

    setCurrentImage(index)
    toggleModal()
    setCurrentImagebase64(currentImagebase64)
  }

  let changeText = (type: TextType) => (e: React.FormEvent<HTMLInputElement>): void => {
    if (type === TextType.Top) {
      setTopText(e.currentTarget.value)
    } else {
      setBottomText(e.currentTarget.value)
    }
  }

  useOnMount(() => {
    document.title = 'Make-a-Meme'
  })

  let image = photos[currentImage]
  let baseImage = new Image()
  baseImage.src = image.src
  let wrh = baseImage.width / baseImage.height
  let newWidth = 600
  let newHeight = newWidth / wrh
  let textStyle = {
    fontFamily: 'Impact',
    fontSize: '50px',
    textTransform: 'uppercase',
    fill: '#fff',
    stroke: '#000',
    userSelect: 'none'
  }

  return (
    <div>
      <div className="main-content">
        <div className="sidebar">
          <NavbarBrand href="/">Make-a-Meme</NavbarBrand>
          <p>This is a fun 5 hours project inspired by imgur. Built with React and Typescript</p>
          <p>
            You can add top and bottom text to a meme-template, move the text around and can save the image by
            downloading it.
          </p>
        </div>
        <div className="content">
          {photos.map((image, index) => (
            <div className="image-holder" key={image.src}>
              <span className="meme-top-caption">Top text</span>
              <img
                style={{ width: '100%', cursor: 'pointer', height: '100%' }}
                alt={`Meme ${index.toString()}`}
                src={image.src}
                onClick={() => openImage(index)}
                role="presentation"
              />
              <span className="meme-bottom-caption">Bottom text</span>
            </div>
          ))}
        </div>
      </div>
      <Modal className="meme-gen-modal" isOpen={modalIsOpen}>
        <ModalHeader toggle={toggleModal}>Make-a-Meme</ModalHeader>
        <ModalBody>
          <svg
            id="svg_ref"
            width={newWidth}
            height={newHeight}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <image xlinkHref={currentImagebase64} height={newHeight} width={newWidth} />
          </svg>
          <div className="meme-form">
            <FormGroup>
              <Label for="toptext">Top Text</Label>
              <Input type="text" name="toptext" placeholder="Add text to the top" onChange={changeText(TextType.Top)} />
            </FormGroup>
            <FormGroup>
              <Label for="bottomtext">Bottom Text</Label>
              <Input
                type="text"
                name="toptext"
                placeholder="Add text to the bottom"
                onChange={changeText(TextType.Bottom)}
              />
            </FormGroup>
            <Button>Download Meme!</Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default App
