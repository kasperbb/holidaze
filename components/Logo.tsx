import { HTMLChakraProps, chakra } from '@chakra-ui/react'

export function Logo(props: HTMLChakraProps<'svg'>) {
  return (
    <chakra.svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 64 18.6" xmlSpace="preserve" width={20} {...props}>
      <path
        fill="#2650D9"
        d="M1.8 18.6c-.3-.1-.5-.2-.7-.2-.2 0-.3-.1-.4-.1-.2-.1-.4-.2-.5-.4-.2-.2-.2-.4-.2-.6.1-.1.1-.2.1-.4v-.5c.1-.1.1-.2.1-.3 0-.1.1-.2.1-.4 0-.3.1-.6.2-1.1s.2-1 .4-1.5c.1-.5.3-1.1.4-1.5.1-.5.3-.9.4-1.2.3-.4.4-.6.4-.7v-.3c0-.3.1-.5.3-.7.1-.2.1-.4.2-.6 0-.2.1-.3.1-.4.1-.1.1-.3.3-.6s.2-.6.3-.9c.1-.2.2-.5.3-.8.1-.3.3-.6.4-1v-.1c0 .1.2-.2.4-.8s.6-1.3 1-2.2c0-.1.1-.3.2-.5.1-.3.2-.4.2-.5.3-.3.5-.3.7-.3.2.1.4.2.6.4s.3.4.4.6l.2.4L6.9 3c-.3.4-.5.8-.7 1.2-.1.3-.2.5-.2.6-.1.4-.3.7-.3 1-.2.3-.3.5-.4.8-.1.5-.3.9-.4 1.2-.2.3-.3.5-.3.6 0 0 .2-.1.5-.1h4c.4 0 .7 0 .8-.1l1.2-.1.6-2c.1-.4.3-.9.5-1.6.2-.6.4-1.1.5-1.6.2-.7.5-1.2.8-1.5.3-.3.6-.4.7-.4 0 0 .1 0 .3.1.1.1.3.2.4.3l.3.3c.2.2.3.4.3.6 0 .2-.1.5-.4.9-.2.4-.4.9-.6 1.3s-.4.8-.5 1.1c0 .2 0 .3-.1.4 0 .1-.1.2-.2.3 0 0-.1.1-.2.3l-.3.6c-.1.2-.1.3-.1.4 0 .1 0 .2-.1.4 0 .2-.1.3-.2.3 0 .1-.1.3-.2.7-.1.4-.2.8-.4 1.3-.1.5-.3 1-.4 1.5-.2.5-.3.9-.4 1.2 0 .1 0 .2-.1.4s-.1.3-.1.4c-.1.2-.1.4-.2.7v.5c-.1.4-.2.8-.2 1.2s-.2.9-.2 1.2c-.1.4-.1.6-.1.6-.4 0-.7 0-.9-.2-.2-.2-.4-.3-.6-.3-.3-.2-.5-.4-.5-.6-.1-.3 0-.6.2-.9.1-.1.2-.4.3-.9.1-.5.2-1 .4-1.4.1-.2.2-.5.3-.9.1-.4.2-.7.3-1l.3-.9c.1-.2.1-.4.2-.4v-.2s-.2-.1-.5-.1H7.6c-.5 0-1 .1-1.4.1h-2s-.1.2-.2.5l-.3.9c-.1.4-.2.7-.3 1.1-.1.4-.2.7-.3 1-.1.3-.1.5-.2.7-.1.3-.1.6-.2 1s-.2.8-.3 1.3c-.3.5-.4.9-.5 1.2-.1.3-.1.6-.1.6zM15.3 16.4c-.2 0-.4 0-.5-.1-.1-.1-.3-.2-.4-.3-.3-.3-.5-.6-.7-1-.2-.4-.2-.7-.2-.9 0-.1.1-.3 0-.5l-.1-.1.1-.1c.1 0 .1-.1.1-.3 0-.1 0-.4.1-.8s.3-.8.5-1.2c.1-.2.2-.4.4-.6.2-.3.4-.5.6-.8.2-.3.4-.5.6-.6.4-.3.7-.6 1.1-.8.3-.2.7-.3 1-.4.3-.1.7-.1 1-.1.4 0 .7.1.9.4.4.2.6.4.7.6.4.2.5.5.5.9 0 .5 0 1-.1 1.7s-.5 1.4-1.1 2.3c-.4.6-.8 1-1.1 1.3-.4.3-.8.6-1.2.8-.3.2-.7.3-1 .4-.5.1-.8.2-1.2.2zm2.4-2.8c.3-.3.6-.6.7-1 .1-.4.3-.8.5-1.2.1-.1.1-.2.1-.5v-.6c0-.2-.1-.3-.2-.4-.1-.1-.3-.1-.4-.1-.1.1-.3.2-.5.3-.5.4-.9.8-1.3 1.3s-.7 1.1-.8 1.8c0 .4 0 .7.1.9.1.2.3.2.6.2.4-.1.7-.3 1.2-.7zM23 16.8c-.3.1-.6 0-.8-.2-.2-.2-.4-.6-.5-1-.1-.5-.1-1 0-1.5.1-.2.1-.4.2-.5 0-.2.1-.3.1-.4 0-.2.1-.4.2-.7l.3-.9.3-.9c.1-.3.2-.4.2-.5.1 0 .1-.1.2-.2 0-.1.1-.2.1-.3 0-.1 0-.3.1-.4.1-.2.1-.3.2-.3 0-.1 0-.2.1-.3 0-.1.1-.2.1-.2 0-.1 0-.1.1-.2 0-.1.1-.1.1-.2.1-.2.2-.5.4-1 .2-.4.4-.9.6-1.5 0-.6.2-1.1.4-1.6s.3-1 .4-1.3.2-.6.2-.7c0-.1 0-.2.1-.3s.2-.2.3-.2c0 0 .2-.1.3-.1h.3l.4.4.4.4c.1 0 .2.2.2.4s0 .4-.1.6c-.1.2-.1.4-.3.7-.1.3-.4.8-.6 1.4-.1.3-.3.6-.4.9-.1.3-.2.4-.2.5 0 .1 0 .2-.1.3-.1.1-.1.3-.2.5-.1.1-.1.3-.3.5-.1.2-.2.5-.3.8-.1.3-.2.5-.3.7-.1.2-.1.3-.1.3v.2c0 .1 0 .1-.1.2-.1 0-.1.1-.1.3 0 .2-.1.6-.4 1.2-.2.8-.5 1.6-.7 2.3-.2.7-.3 1.3-.3 1.7 0 .4-.1.7-.2.9 0 0-.1.1-.3.2zM27.8 16.5c-.4 0-.7-.2-1-.6-.3-.4-.4-.9-.5-1.4 0-.1 0-.3.1-.5 0-.2 0-.5.1-.7.1-.3.1-.7.3-1.1.1-.5.2-.9.3-1.4.1-.5.2-.9.3-1.2.1-.3.1-.5.2-.6.1-.2.3-.3.6-.2.3.1.6.3.8.7.1.1.1.3.2.4 0 .2 0 .4-.1.7-.1.3-.2.8-.4 1.4-.2.6-.3 1.1-.4 1.5-.1.4-.1.8-.1 1.2-.1.7-.1 1.2-.2 1.4 0 .3-.1.4-.2.4zM29.9 7h-.2c-.1 0-.1 0-.3-.1-.1 0-.2-.1-.4-.2s-.3-.3-.4-.4c-.1-.1-.2-.2-.2-.3v-.7c0-.3.1-.7.3-1 .1-.3.3-.5.5-.5.1 0 .2 0 .4.1s.4.1.7.2c.1.2.2.5.3.9.1.4.1.7 0 1.1.1.4-.2.7-.7.9zM37.3 16.5h-.6c-.2 0-.3 0-.4-.1-.3-.2-.5-.4-.5-.6-.1-.1-.1-.3-.1-.5v-1.2c-.1-.1-.2 0-.4.2l-.6.6c-.5.5-.9.9-1.3 1.2-.4.2-.7.4-1 .4h-.9c-.3 0-.5-.2-.7-.4-.2-.2-.4-.5-.5-.9-.1-.4-.1-.7-.1-1 .1-.6.2-1.2.4-1.7s.5-1.1.9-1.6c.2-.2.4-.5.7-.8.3-.3.7-.6 1-.8.4-.3.7-.4 1-.5.4-.2.8-.3 1.1-.3.3 0 .6.1.9.1.2.1.4.2.5.2.1 0 .2-.1.3-.2.1-.1.2-.3.2-.5s.1-.4.2-.5l.5-1.5c.2-.4.4-.9.6-1.4.2-.5.5-1.1.8-1.8.4-.6.7-.9.9-.9.3 0 .5.1.8.4.2.2.3.4.3.7 0 .3-.1.6-.2.9l-.3.6c-.1.3-.3.5-.4.9-.2.4-.3.8-.5 1.2-.2.4-.4.8-.5 1.3-.1.2-.1.5-.2.9-.1.3-.2.6-.2.9 0 .2-.1.5-.1.7-.1.2-.1.3-.2.3-.1.1-.2.3-.3.7-.1.3-.2.7-.3 1.1-.1.4-.1.7-.2.9 0 .2-.1.4-.1.8v1.5c0 .3 0 .5-.1.6-.3.1-.3.1-.4.1zm-5.2-1.8c.4 0 .7-.1 1-.4.3-.3.7-.6 1-1 .2-.2.5-.5.7-.8.2-.3.5-.6.7-.8.2-.3.4-.5.5-.7.1-.2.2-.3.2-.4 0-.1-.1-.1-.2-.2s-.2-.1-.4-.1h-.4c-.4.1-.7.3-.9.5-.2.2-.5.6-1 1-.4.5-.7 1-1 1.4-.2.5-.4.8-.4 1.1 0 .3 0 .4.2.4zM41.3 16.1c-.2 0-.4 0-.6-.2-.2-.2-.4-.3-.6-.6-.2-.2-.3-.4-.3-.6-.1-.3 0-.7.1-1.2s.3-1 .5-1.5.6-1.1.9-1.6c.4-.5.8-1 1.2-1.4.5-.4 1-.7 1.5-1 .2-.1.4-.2.5-.2h.3c.1 0 .3.1.5.2s.4.1.7.2c.2.1.4.2.6.5.1.2.2.5.3.7.1.2.1.5.2.8-.1.5-.1.8-.1.9 0 .1-.1.2-.1.3-.1.2-.2.2-.1.2 0 .1-.1.2-.1.3-.1.3-.2.7-.2 1-.1.3-.1.6 0 .8.1.3.3.5.5.6.2.1.5-.1.8-.4.2-.1.4-.2.6-.2.2 0 .3 0 .3.1.1.1.2.1.2.1.1 0 .1.1.1.2s0 .3-.1.5c0 .2-.1.3-.2.5-.2.2-.3.4-.3.5l-.3.3c-.3.2-.6.3-1 .3s-.7-.1-1-.3c-.2-.2-.5-.4-.7-.6-.2-.2-.4-.5-.4-.7l-.1-.2-.7.4-.4.4c-.1.1-.1.2-.2.2 0 .1-.1.1-.1.2-.1 0-.1.1-.2.1h-.2c0 .1-.1.1-.3.2-.2.1-.5.2-.7.3-.5-.1-.7-.1-.8-.1zm.9-2.1c.2-.1.4-.3.6-.4.2-.2.4-.3.6-.5l.4-.4c.1-.1.1-.2.2-.3.1-.1.2-.3.3-.4.4-.4.6-.7.7-1 .1-.2.1-.5-.1-.8-.1-.2-.1-.3-.2-.3s-.3 0-.6.2c-.2.1-.4.3-.6.5s-.4.5-.7.8l-.6.9c-.2.3-.3.6-.4.9-.1.3-.2.5-.2.6 0 .1 0 .1.1.2.1.2.3.1.5 0zM49.8 16.4c-.3-.1-.6-.3-.7-.6-.2-.2-.2-.5-.1-.9s.4-.9.8-1.4c.5-.6 1.1-1.3 2-2.2.5-.5.9-.9 1.2-1.3.3-.4.5-.6.5-.7-.7 0-1.5 0-2.3.1-.6 0-.9 0-1.1-.2-.2-.2-.3-.4-.3-.6-.1-.2-.1-.4 0-.5.1-.2.3-.3.5-.4.2-.1.4-.1.5-.1.1 0 .2-.1.5-.1h1c.4 0 .8.1 1.1.1.3 0 .6.1.7.1.2 0 .4.1.7.2.3.1.5.2.7.4.2.2.3.4.3.6 0 .2-.1.4-.1.7-.1.3-.2.5-.4.7-.4.4-.8.9-1.3 1.3L52.6 13c-.2.3-.5.5-.8.8-.3.3-.4.5-.5.7 0 .1.1.1.2.1s.2 0 .5-.1.7-.1 1.3-.2c.8-.2 1.3-.3 1.6-.2.3.1.5.3.5.5 0 .1-.1.2-.1.4l-.3.6c-.1.2-.3.3-.5.3-.2.1-.5.1-.8.2-.3.1-.5.1-.7.2-.7.2-1.2.3-1.5.3-.4.1-.7.1-.9 0-.3 0-.5-.1-.8-.2zM61.2 16.1c-.5.3-.9.4-1.5.4-.5 0-1 0-1.4-.2-.4-.2-.8-.4-1.1-.8-.2-.2-.3-.5-.4-1-.1-.4-.2-1-.1-1.8.1-.7.3-1.4.7-2.1.3-.7.8-1.4 1.3-1.9.5-.6 1.1-.9 1.7-1.1.2-.1.4-.1.7-.2h.9c.4 0 .7.1.9.3.3.1.5.3.6.4.2.2.4.5.5.7v.7c-.1.5-.3 1-.7 1.6-.4.6-.9 1-1.5 1.3-.3.1-.6.2-.9.2-.4 0-.8 0-1.4-.1-.4-.1-.6 0-.7.1-.1.2-.2.5-.1.9 0 .3.1.5.2.7.1.2.3.3.6.4.4.1.6.1.8 0 .2-.1.3-.1.6-.2.1-.1.2-.2.4-.3l.3-.3c.1-.1.2-.2.3-.2.1-.1.2-.1.2-.1h.2c.2 0 .3.1.5.3.2.2.3.3.3.5 0 .1-.1.3-.2.5-.2.2-.4.5-.6.7-.5.2-.8.4-1.1.6zm-.3-5.1c.1 0 .3-.2.5-.3.2-.2.4-.3.6-.5.2-.2.3-.3.3-.4 0-.2-.1-.3-.3-.4-.2-.1-.5-.1-.9-.1-.1 0-.3.1-.4.3-.2.1-.3.3-.5.5s-.3.3-.4.5c-.1.2-.2.3-.3.4.1.1.2.1.4.2.2 0 .4.1.6.1.1-.3.3-.3.4-.3z"
      />
    </chakra.svg>
  )
}
