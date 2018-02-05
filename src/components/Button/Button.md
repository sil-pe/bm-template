#### Examples

#### disabled plus
      
      const {ButtonPlus} = require('../icons');
      <Button id='button-plus-disabled' clickable={false}>
         <ButtonPlus />
      </Button>      

#### clickable plus
      const {ButtonPlus} = require('../icons');
      <Button id='button-plus-enabled' clickable={true}>
         <ButtonPlus />
      </Button>

#### disabled minus
      const {ButtonMinus} = require('../icons');
      <Button id='button-minus-disabled' clickable={false}>
          <ButtonMinus />
      </Button>

#### clickable minus

      const {ButtonMinus} = require('../icons');
      <Button id='button-minus-enabled' clickable={true}>
          <ButtonMinus />
      </Button>

#### all styles
      <div id='all-styles'>
        <Button id='default' clickable={true}>default</Button>
        <span>&nbsp;</span>
        <Button id='default-disabled'>default</Button>
        <span>&nbsp;</span>
        <Button id='error' type='error' clickable={true}>error</Button>
        <span>&nbsp;</span>
        <Button id='error-disabled' type='error'>error</Button>
        <span>&nbsp;</span>
        <Button id='remark' type='remark' clickable={true}>remark</Button>
        <span>&nbsp;</span>
        <Button id='remark-disabled' type='remark'>remark</Button>
        <span>&nbsp;</span>
        <Button id='correct' type='correct' clickable={true}>correct</Button>
        <span>&nbsp;</span>
        <Button id='correct-disabled' type='correct'>correct</Button>
      </div>
