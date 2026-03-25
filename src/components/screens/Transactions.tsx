import React, { useMemo, useRef, useState } from 'react';
import { Pressable, SectionList, TextInput } from 'react-native';
import Box from 'components/Box';
import Text from 'components/Text';
import { CONTACTS } from 'views/CowryMFB/data';
import * as SVG from 'assets/icons';
import BeneficiaryContactitem from './ContactItem';
import { actionResRef } from 'components/ActionResponseModal';
import DeleteMfbBeneficiary from './DeleteBeneficiary';

export type Contact = {
  id: string;
  name: string;
  bank: string;
  accountNumber: string;
};

type Section = {
  title: string;
  data: Contact[];
};

// ✅ Group Contacts into Sections
const groupContacts = (contacts: Contact[]): Section[] => {
  const grouped: Record<string, Contact[]> = {};

  contacts.forEach(contact => {
    const letter = contact.name.charAt(0).toUpperCase();

    if (!grouped[letter]) {
      grouped[letter] = [];
    }

    grouped[letter].push(contact);
  });

  return Object.keys(grouped)
    .sort()
    .map(letter => ({
      title: letter,
      data: grouped[letter].sort((a, b) => a.name.localeCompare(b.name)),
    }));
};

const BeneficiaryContactList = () => {
  const [search, setSearch] = useState('');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Contact>(
    {} as Contact,
  );
  const inputRef = useRef<TextInput>(null);

  // ✅ Filter logic
  const filteredContacts = useMemo(() => {
    if (!search.trim()) return CONTACTS;

    const query = search.toLowerCase();

    return CONTACTS.filter(contact => {
      return (
        contact.name.toLowerCase().includes(query) ||
        contact.bank.toLowerCase().includes(query) ||
        contact.accountNumber.includes(query)
      );
    });
  }, [search]);

  // ✅ Sections
  const sections = useMemo(
    () => groupContacts(filteredContacts),
    [filteredContacts],
  );

  const onSearchIconPress = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // focus the input when search icon is pressed
    }
  };

  const handleBeneficiaryDelete = (beneficiary: Contact) => {
    setSelectedBeneficiary(beneficiary);
    actionResRef.current?.present();
  };

  return (
    <Box flex={1} backgroundColor="light">
      {/* 🔍 Search Input */}
      <Box padding="m">
        <Box position="relative" justifyContent="center">
          <TextInput
            ref={inputRef}
            placeholder="Search by name, bank, or account number"
            value={search}
            onChangeText={setSearch}
            style={{
              backgroundColor: '#F6F8FA',
              borderRadius: 10,
              paddingHorizontal: 12,
              paddingRight: 40, // space for the icon
              paddingVertical: 10,
            }}
          />

          <Pressable
            onPress={onSearchIconPress}
            style={{
              position: 'absolute',
              right: 12,
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SVG.SearchIcon height={18} width={18} />
          </Pressable>
        </Box>
      </Box>

      {/* 📋 Section List */}
      <SectionList
        sections={sections}
        keyExtractor={item => item.id}
        stickySectionHeadersEnabled
        showsVerticalScrollIndicator={false}
        // 🔹 Section Header
        renderSectionHeader={({ section: { title } }) => (
          <Box
            paddingVertical="xs"
            paddingHorizontal="m"
            // backgroundColor="grey50"
          >
            <Text variant="paragraphFourBold" color="grey500">
              {title}
            </Text>
          </Box>
        )}
        // 🔹 Item
        renderItem={({ item, index }) => (
          <BeneficiaryContactitem
            handleItemSelect={handleBeneficiaryDelete}
            key={index}
            item={item}
            index={index}
          />
        )}
        // 🔹 Empty State
        ListEmptyComponent={() => (
          <Box padding="l" alignItems="center">
            <Text variant="paragraphThree" color="grey500">
              No contacts found
            </Text>
          </Box>
        )}
      />

      {selectedBeneficiary?.id && (
        <DeleteMfbBeneficiary beneficiary={selectedBeneficiary} />
      )}
    </Box>
  );
};

export default BeneficiaryContactList;
