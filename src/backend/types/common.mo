module {
  public type Timestamp = Int;

  public type DesignCategory = {
    #residential;
    #apartments;
    #dairyFarms;
    #smallBusiness;
    #custom;
  };

  public type DesignTier = {
    #free;
    #premium;
    #ultraPremium;
  };

  public type UserTier = {
    #free;
    #premium;
    #ultraPremium;
  };

  public type Region = {
    #urban;
    #semiUrban;
    #rural;
  };

  public type MaterialGrade = {
    #basic;
    #standard;
    #premium;
  };

  public type InquiryStatus = {
    #pending;
    #reviewed;
    #responded;
  };
};
