package com.master.InstagramClone.response;

public class ApiResponce {
    private String messege;
    private boolean status;

    public ApiResponce() {
    }

    public ApiResponce(String messege,boolean status) {
        super();
        this.status = status;
        this.messege = messege;
    }

    public String getMessege() {
        return messege;
    }

    public void setMessege(String messege) {
        this.messege = messege;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
