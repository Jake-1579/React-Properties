import React from 'react';
import { Item, Label, Container, Loader, Dimmer } from 'semantic-ui-react';

class Properties extends React.Component {

    render() {
        const feed = this.props.feed;
        const isLoading = (this.props.feed.length === 0 ? false : true);
        const renderList = feed.map((i) =>
                <Item key={i.id} className="property__items__item">
                    <Item.Image size='large' src={i.propertyImages} />
                    <Item.Content>
                        <Item.Header target="_blank" as='a' href={'https://rightmove.co.uk' + i.propertyUrl}>{i.propertyTypeFullDescription}</Item.Header>
                        <Item.Description>
                            <p className="title">{i.displayAddress}</p>
                            <p>{i.summary}</p>
                        </Item.Description>
                        <Item.Extra className="property__additional">
                            <Label className="property__additional--price"> £{i.price}</Label>
                            <Label className="property__additional--desc" icon='globe' content={i.formattedBranchName} />
                        </Item.Extra>
                    </Item.Content>
                </Item>
        );

      return(
          <Container className="property">
              {!isLoading &&
                <Dimmer active>
                    <Loader />
                </Dimmer>
              }
              <Item.Group className="property__items">
                  {renderList}
              </Item.Group>
          </Container>
      )

    }

}

export default Properties;