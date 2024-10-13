// components/RuleModal.tsx
import React from 'react';
import { RuleGroup } from '../types';
import { Modal, ModalContent } from './Modal/styles';
import queryDisplay from './Modal/QueryDisplay';
import Button from './common/Button';
import { MdClose } from 'react-icons/md';

interface RuleModalProps {
  mode: 'view' | 'delete';
  current: RuleGroup | null;
  onClose: () => void;
  onDelete: () => void;
}

const RuleModal: React.FC<RuleModalProps> = ({ mode, current, onClose, onDelete }) => {
  const renderContent = () => {
    switch (mode) {
      case 'view':
        return (
          <>
            <div className="p-2 bg-purple border-b-2">
              <h2
                id="unstyled-modal-title"
                className="m-0 leading-6 text-white text-lg py-4 px-6"
              >
                Query
              </h2>
            </div>
            <div className="font-mono max-w-md py-10 px-6">
              {current && queryDisplay(current)}
            </div>
          </>
        );
      case 'delete':
        return (
          <>
            <p className="font-semibold text-lg px-4 py-4 bg-purple">
              Delete this rule?
            </p>
            <p className='px-4 pt-4'>
              Deleting this rule will remove it from your dashboard. Are you sure?
            </p>
            <div className="mx-auto font-mono max-w-md mt-4 p-4 border border-outline">
              {current && queryDisplay(current)}
            </div>

            <div className="flex justify-between p-4">
              <Button variant="grey" onClick={onDelete}>
                Yes
              </Button>
              <Button variant="primary" onClick={onClose}>
                No
              </Button>
              </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Modal open={Boolean(current)} onClose={onClose}>
      <ModalContent className="bg-black border border-grey relative rounded">
      <button
                onClick={onClose}
                className="w-fit absolute top-6 right-4 p-1 bg-purple-hover rounded-sm"
              >
                <MdClose size={16} color="white" />
              </button>
        {renderContent()}
      </ModalContent>
    </Modal>
  );
};

export default RuleModal;
