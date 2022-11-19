
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
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'
import Logo from './Logo'

const allLinks = ['Inicio', 'Projects', 'Team']

const NavLink = ({ children }) => <Link href='#'>{children}</Link>

export default function NavBar ({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const colorMode = useColorModeValue('blue.100', 'blue.900')

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
            <Button
              variant='solid'
              colorScheme='teal'
              size='sm'
              mr={4}
              leftIcon={<AddIcon />}
            >
              Action
            </Button>
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
                  src='https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen
          ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as='nav' spacing={4}>
                {allLinks.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
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
