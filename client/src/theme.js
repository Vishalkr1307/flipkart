import {extendTheme, useColorModeValue} from "@chakra-ui/react"

export const theme=extendTheme({
    
    components:{
        Button:{
            defaultProps:{
                size:"lg",
                variant:"sm",
                colorScheme:"green"
            }
        }
    }

})