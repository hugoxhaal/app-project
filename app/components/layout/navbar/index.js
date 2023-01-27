
import Link from 'next/link'

import {
  Box,
  Flex,
  Avatar,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'
import Logo from './Logo'
import { useAuth } from '../../../hooks/useAuth'
import { useRouter } from 'next/navigation'

const allLinks = [{ name: 'Periodos', path: '/periodos' },
  { name: 'Estudiantes', path: '/estudiantes' },
  { name: 'Materias', path: '/materias' },
  { name: 'Inscripciones', path: '/inscripciones' },
  { name: 'Calificaciones', path: '/calificaciones' }]

export default function NavBar ({ children }) {
  const { signout } = useAuth()
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const colorMode = useColorModeValue('blue.100', 'blue.800')

  const handleSignOut = () => {
    setTimeout(() => {
      signout()
      router.push('/')
    }, 2000)
  }

  return (
    <>
      <Box bg={colorMode} px={4}>
        <Flex h={16} alignItems='center' justifyContent='space-between'>
          <IconButton
            size='md'
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label='Open Menu'
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Logo links={allLinks} />
          <Flex alignItems='center'>
            {/* <Button
              variant='solid'
              colorScheme='teal'
              size='sm'
              mr={4}
              leftIcon={<AddIcon />}
            >
              Action
            </Button> */}
            <Menu isLazy id='menu1'>
              <MenuButton
                as={Button}
                rounded='full'
                variant='link'
                cursor='pointer'
                minW={0}
              >
                <Avatar
                  size='sm'
                />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={handleSignOut}>Cerrar sesion</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen
          ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as='nav' spacing={4}>
                {allLinks.map((link, i) => (
                  <Link key={i} href={link.path}>{link.name}</Link>
                ))}
              </Stack>
            </Box>
            )
          : null}
      </Box>

      <Box>{children}</Box>
    </>
  )
}
