'use strict';

const { expect } = require( 'chai' );
const exp = require('constants');

const PhoneNumber = require( '../../' );

describe( 'general', function( ) {
	it( 'should be able to parse a phone number', function( ) {
		var pn = new PhoneNumber( '3034567779' );
		expect( pn.isValid( ) ).to.be.true;
		expect( pn.isPossible( ) ).to.be.true;
		expect( pn.isMobile( ) ).to.be.true;
		expect( pn.canBeInternationallyDialled( ) ).to.equal( true );
    expect(pn.getType()).to.equal('fixed-line-or-mobile');
		expect( pn.toJSON( ).canBeInternationallyDialled ).to.equal( true );
    expect( pn.toJSON().e164).to.equal('+13034567779')
    expect( pn.toJSON().international).to.equal('+1 303-456-7779');
    expect( pn.toJSON().national).to.equal('(303) 456-7779');
    expect( pn.toJSON().rfc3966).to.equal('tel:+1-303-456-7779');
    expect( pn.toJSON().significant).to.equal('3034567779');
    expect(pn.getNumber()).to.equal('+13034567779');
    expect( pn.getNumber( 'significant' ) ).to.equal( '3034567779' );
    expect(pn.getRegionCode()).to.equal('US')
	} );

	it( 'should be able to create an example phone number', function( ) {
		var pn1 = PhoneNumber.getExample( 'SE' );
		expect( pn1.isValid( ) ).to.be.true;
		expect( pn1.isPossible( ) ).to.be.true;

		var pn2 = PhoneNumber.getExample( 'SE', 'mobile' );
		expect( pn2.isValid( ) ).to.be.true;
		expect( pn2.isPossible( ) ).to.be.true;
		expect( pn2.isMobile( ) ).to.be.true;
		expect( pn2.isFixedLine( ) ).to.be.false;

		var pn3 = PhoneNumber.getExample( 'SE', 'fixed-line' );
		expect( pn3.isValid( ) ).to.be.true;
		expect( pn3.isPossible( ) ).to.be.true;
		expect( pn3.isMobile( ) ).to.be.false;
		expect( pn3.isFixedLine( ) ).to.be.true;
	} );

	it( 'should be able to convert country code <-> region code', function( ) {
		expect( PhoneNumber.getCountryCodeForRegionCode( 'SE' ) ).to.equal( 46 );
		expect( PhoneNumber.getRegionCodeForCountryCode( 46 ) ).to.equal( 'SE' );
	} );

	it( 'should be possible to get region code', function( ) {
		var pn = new PhoneNumber( '0707123456', 'SE' );
		expect( pn.getRegionCode( ) ).to.equal( 'SE' );
	} );

	it( 'should have supported calling codes', function( ) {
		const codes = PhoneNumber.getSupportedCallingCodes( );
		expect( codes.length ).to.be.above( 100 );
	} );

	it( 'should have supported calling regions', function( ) {
		const regions = PhoneNumber.getSupportedRegionCodes( );
		expect( regions.length ).to.be.above( 100 );
	} );
} );
