const { create } = require('ipfs-http-client');
const fs = require('fs');
const path = require('path');

async function uploadToIPFS() {
  try {
    // Connect to Infura IPFS node
    const ipfs = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https'
    });

    // Read the metadata file
    const metadataPath = path.join(__dirname, '../public/token-metadata.json');
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

    // Upload metadata to IPFS
    const result = await ipfs.add(JSON.stringify(metadata));
    const metadataUri = `https://ipfs.io/ipfs/${result.path}`;

    console.log('\nMetadata uploaded to IPFS successfully!');
    console.log('IPFS URI:', metadataUri);
    console.log('\nUpdate your createToken.js with this URI:');
    console.log(`const tokenUri = "${metadataUri}";`);

    // If you have an image, upload it too
    const imagePath = path.join(__dirname, '../public/images/dexbot-token.png');
    if (fs.existsSync(imagePath)) {
      const imageBuffer = fs.readFileSync(imagePath);
      const imageResult = await ipfs.add(imageBuffer);
      const imageUri = `https://ipfs.io/ipfs/${imageResult.path}`;
      
      console.log('\nImage uploaded to IPFS successfully!');
      console.log('Image URI:', imageUri);
      
      // Update metadata with new image URI
      metadata.image = imageUri;
      metadata.properties.files[0].uri = imageUri;
      
      // Upload updated metadata
      const updatedResult = await ipfs.add(JSON.stringify(metadata));
      const updatedMetadataUri = `https://ipfs.io/ipfs/${updatedResult.path}`;
      
      console.log('\nUpdated metadata with image URI:');
      console.log('Updated IPFS URI:', updatedMetadataUri);
      console.log('\nUpdate your createToken.js with this URI:');
      console.log(`const tokenUri = "${updatedMetadataUri}";`);
    }

  } catch (error) {
    console.error('Error uploading to IPFS:', error);
  }
}

uploadToIPFS(); 