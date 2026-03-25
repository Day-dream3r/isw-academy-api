
import React from 'react'
import Box from 'components/Box'
import Text from 'components/Text'
import { Pressable } from 'react-native'
import * as SVG from 'assets/icons';
import  { actionResRef } from 'components/ActionResponseModal';
import { Contact } from '.';


type BeneficiaryContactitemProp = {
    index: number;
    item: Contact;
    handleItemSelect: (item: Contact) => void;
    deleteItem?: boolean;
}
const BeneficiaryContactitem = ({ deleteItem = true, index, item, handleItemSelect, }: BeneficiaryContactitemProp) => {

    const handleDeleteModal = () => {
        actionResRef.current?.present();
    }


    return (
        <>
            <Box
                padding="m"
                // borderBottomWidth={0.5}
                borderColor="grey0"
                flexDirection="row"
                alignItems="center"
                gap="m"
            >
                {/* Avatar */}
                <Box
                    width={36}
                    height={36}
                    borderRadius={20}
                    backgroundColor={index % 2 === 0 ? "orangePrimary" : 'green500'}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Text variant="paragraphThreeBold" color="grey50" textTransform={'uppercase'}>
                        {item.name
                            .split(' ')
                            .slice(0, 2)
                            .map(n => n[0].toUpperCase())
                            .join('')}
                    </Text>
                </Box>

                {/* Info */}
                <Box flexDirection={'row'} flex={1} justifyContent={'space-between'} alignItems={'center'}>
                    <Box >
                        <Text variant="paragraphThree" color="black900">
                            {item.name}
                        </Text>
                        <Text variant="paragraphFour" color='textPrimary'>
                            {item.bank} • {item.accountNumber}
                        </Text>
                    </Box>
                    {deleteItem && (
                        <Pressable onPress={() => handleItemSelect(item)}>
                            <SVG.DeletePostItem height={24} width={24} />
                        </Pressable>
                    )}
                </Box>
            </Box>

        </>
    )
}

export default BeneficiaryContactitem